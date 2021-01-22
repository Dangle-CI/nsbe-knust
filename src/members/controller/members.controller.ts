import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MembersService } from '../service/members.service';
import { MembersDto } from '../dto/members.dto';

@ApiTags('Members List')
@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {
  }

  @Post()
  async createMember(@Body() member: MembersDto): Promise<MembersDto> {
    return this.membersService.createNewMember(member);
  }

  @Get()
  async getAllMembers(): Promise<Array<MembersDto>> {
    return this.membersService.getAllMembers();
  }

  @Get(':id')
  async getMemberById(@Param('id') id: string): Promise<MembersDto> {
    return this.membersService.getMembersById(id);
  }

  // @Patch()
  // async updateMember(@Body() member: MembersDto): Promise<Members> {
  //   return this.membersService.updateMember(member);
  // }
  //
  // @Delete(':id')
  // async deleteMember(@Param('id') id: string): Promise<Members> {
  //   return this.membersService.deleteMember(id);
  // }
}
