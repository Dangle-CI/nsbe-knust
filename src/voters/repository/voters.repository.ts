import { EntityRepository, Repository } from 'typeorm';
import { Voters } from '../entity/voters.entity';
import { MembersService } from '../../members/service/members.service';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Voters)
export class VotersRepository extends Repository<Voters> {
  constructor(private membersService: MembersService) {
    super();
  }

  async createVoter(memberId: Voters) {
    try {
      await memberId.save();
      return memberId;
    } catch (e) {
      if (e.code === '23505' || 'ER_DUP_ENTRY') throw new ConflictException('User already voted');
      else throw new InternalServerErrorException();
    }
  }

  async getAllVoters(): Promise<Voters[]> {
    const query = this.createQueryBuilder('election');
    const voter = await query.getMany();
    return voter;
  }

  getVoterById(id: string) {}
}
