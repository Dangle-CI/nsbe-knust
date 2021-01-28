import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VotersRepository } from '../repository/voters.repository';
import { Voters } from '../entity/voters.entity';
import { MembersService } from '../../members/service/members.service';
import { MembersDto } from '../../members/dto/members.dto';
import { Vote, VoterDetails } from '../dto/voters.dto';
import { ElectionService } from '../../election/service/election.service';
import { GetAspirantDetails } from '../../election/dto/election.dto';
import { SimpleDto } from '../../shared/simple.dto';

@Injectable()
export class VotersService {
  constructor(
    @InjectRepository(VotersRepository) private votersRepository: VotersRepository,
    private membersService: MembersService,
    private electionService: ElectionService,
  ) {
  }

  async getVoterDetails(id: string): Promise<MembersDto> {
    return await this.membersService.getMembersByMemberId(id);
  }

  async createVoter(memberId: Vote): Promise<VoterDetails> {
    if (!memberId.memberId) throw new UnauthorizedException('No ID Provided');
    const isMember = await this.getVoterByMemberId(memberId.memberId);
    // console.log(isMember);
    if (isMember && isMember.voted) {
      throw new UnauthorizedException('Member has already voted');
    } else if (isMember && !isMember.voted) {
      const voterDetails = new VoterDetails();
      voterDetails.id = isMember.id;
      voterDetails.voterDetails = await this.getVoterDetails(isMember.memberId);
      voterDetails.aspirants = await this.electionService.getAllAspirants();
      return voterDetails;
    } else {
      const isMember = await this.getVoterDetails(memberId.memberId);
      // console.log(isMember);
      if (isMember) {
        let voter = new Voters();
        const voterDetails = new VoterDetails();
        voter.memberId = memberId.memberId;
        const voterId = await this.votersRepository.createVoter(voter);
        voterDetails.id = voterId.id;
        voterDetails.voterDetails = await this.getVoterDetails(voterId.memberId);
        voterDetails.aspirants = await this.electionService.getAllAspirants();
        return voterDetails;
      }
    }
  }

  async getAllVoters(): Promise<VoterDetails[]> {
    const voters: any = await this.votersRepository.getAllVoters();
    for (let voter of voters) {
      const voterDetails = this.getVoterDetails(voter.id);
      voter = Object.assign(voter, voterDetails);
    }
    return voters;
  }

  async getVoterById(id: number): Promise<Voters> {
    const voter = await this.votersRepository.find({ id });
    if (!voter) throw new NotFoundException('Voter not found');
    return voter[0];
  }

  async getVoterByMemberId(memberId: string): Promise<Voters> {
    const voter = await this.votersRepository.findOne({ memberId });
    if (!voter) return null;
    return voter;
  }

  async updateVoterStatus(id: number, aspirants: Array<GetAspirantDetails>): Promise<SimpleDto> {
    const data = aspirants;
    const voter = await this.getVoterById(id);
    voter.voted = true;
    try {
      for (const aspirant of data) {
        if (aspirant) {
          // console.log(aspirant.id);
          await this.electionService.voteForAspirant(aspirant.id);
        }
      }
      await voter.save();
      return { status: 'Voted' };
    } catch (e) {
      // console.log(e);
      throw new InternalServerErrorException();
    }
  }

  groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
      }, {});
  }
}
