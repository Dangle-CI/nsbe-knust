import { EntityRepository, Repository } from 'typeorm';
import { Members } from '../entity/members.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Members)
export class MembersRepository extends Repository<Members> {
  async addMembers(member: Members): Promise<Members> {
    try {
      await member.save({ data: member });
      return member;
    } catch (e) {
      if (e.code === '23505' || 'ER_DUP_ENTRY') throw new ConflictException('User already exist');
      else throw new InternalServerErrorException();
    }
  }

  async getAllMembers(): Promise<Array<Members>> {
    const query = this.createQueryBuilder('allMembers');
    const allMembers = await query.getMany();
    return allMembers;
  }
}
