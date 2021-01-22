import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VotersRepository } from '../repository/voters.repository';
import { Voters } from '../entity/voters.entity';
import { MembersService } from '../../members/service/members.service';
import { MembersDto } from '../../members/dto/members.dto';
import { Vote, VoterDetails } from '../dto/voters.dto';
import { ElectionService } from '../../election/service/election.service';
import { CreateAspirantDto } from '../../election/dto/election.dto';
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
    const voted = await this.getVoterByMemberId(memberId.memberId);
    if (voted && voted.voted) {
      throw new UnauthorizedException('Member has already voted');
    } else if (voted && !voted.voted) {
      return voted;
    } else {
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

  async updateVoterStatus(id: number, aspirants: CreateAspirantDto[]): Promise<SimpleDto> {
    const voter = await this.getVoterById(id);
    voter.voted = true;
    try {
      for (const aspirant of aspirants) {
        if (aspirant) {
          await this.electionService.voteForAspirant(aspirant.id);
        }
      }
      await voter.save();
      return { status: 'Voted' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
