import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionRepository } from '../repository/election.repository';
import { MembersService } from '../../members/service/members.service';
import { CreateAspirantDto, GetAspirantDetails } from '../dto/election.dto';
import { Election } from '../entity/election.entity';
import { SimpleDto } from '../../shared/simple.dto';

@Injectable()
export class ElectionService {
  constructor(@InjectRepository(ElectionRepository) private electionRepository: ElectionRepository, private membersService: MembersService) {
  }

  async getAspirantDetails(id: string): Promise<any> {
    return await this.membersService.getMembersByMemberId(id);
  }

  async getAspirantById(id: string): Promise<GetAspirantDetails> {
    const aspirant: any = await this.electionRepository.getAspirantById(id);
    aspirant['memberDetails'] = await this.getAspirantDetails(aspirant.memberId);
    return aspirant;
  }

  async createAspirant(data: CreateAspirantDto): Promise<GetAspirantDetails> {
    const aspirant = new Election();
    aspirant.image = data.image;
    aspirant.memberId = data.memberId;
    aspirant.position = data.position;
    aspirant.votes = 0;
    return this.electionRepository.createAspirant(aspirant);
  }

  async updateAspirantInfo(data: CreateAspirantDto, id: string): Promise<GetAspirantDetails> {
    const aspirant = await this.electionRepository.getAspirantById(id);
    aspirant.image = data.image;
    aspirant.memberId = data.memberId;
    aspirant.position = data.position;
    try {
      await aspirant.save();
      return this.getAspirantById(aspirant.id);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async voteForAspirant(id: string): Promise<SimpleDto> {
    const aspirant = await this.electionRepository.getAspirantById(id);
    aspirant.votes += 1;
    try {
      await aspirant.save();
      return { status: 'Voted' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  getAllAspirants(): Promise<Array<GetAspirantDetails>> {
    const aspirants: any = this.electionRepository.getAllAspirants();
    if (aspirants.length) {
      for (let aspirant of aspirants) {
        const memberDetails = this.getAspirantDetails(aspirant.memberId);
        aspirant = Object.assign(aspirant, memberDetails);
      }
    }
    return aspirants;
  }

}
