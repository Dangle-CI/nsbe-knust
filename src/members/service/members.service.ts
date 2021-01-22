import { Injectable, NotFoundException } from '@nestjs/common';
import { Members } from '../entity/members.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersRepository } from '../repository/members.repository';
import { MembersDto } from '../dto/members.dto';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(MembersRepository) private membersRepository: MembersRepository) {
  }

  async createNewMember(member: MembersDto): Promise<Members> {
    const newMember = new Members();
    newMember.regDate = member.regDate;
    newMember.memberId = member.memberId;
    newMember.email = member.email;
    newMember.programme = member.programme;
    newMember.mobile = member.mobile;
    newMember.otherNames = member.otherNames;
    newMember.surname = member.surname;
    return await this.membersRepository.addMembers(newMember);
  }

  async getMembersById(id: string): Promise<MembersDto> {
    const member = await this.membersRepository.find({ id });
    if (!member) throw new NotFoundException(`Member with ID: ${id} not found`);
    return member[0];
  }

  async getAllMembers(): Promise<Array<Members>> {
    return await this.membersRepository.getAllMembers();
  }

  async getMembersByMemberId(memberId: string): Promise<MembersDto> {
    const member = await this.membersRepository.find({ memberId });
    if (!member) throw new NotFoundException(`Member with ID: ${memberId} not found`);
    return member[0];
  }

  // async updateMember(data: MembersDto): Promise<Members> {
  //   // console.log(data);
  //   const member = await this.getMembersById(data.id);
  //   return await this.membersRepository.addMembers(member);
  // }
  //
  // async deleteMember(id: string): Promise<any> {
  //   const result = await this.membersRepository.delete({ id });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Candidate with ID "${id}" not found`);
  //   }
  //   return { id, message: 'Deleted' };
  // }
}
