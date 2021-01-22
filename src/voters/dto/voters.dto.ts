import { ApiProperty } from '@nestjs/swagger';
import { MembersDto } from '../../members/dto/members.dto';
import { CreateAspirantDto, GetAspirantDetails } from '../../election/dto/election.dto';

export class VoterDetails {
  @ApiProperty()
  id: number;
  @ApiProperty()
  voterDetails?: MembersDto;
  @ApiProperty()
  aspirants?: GetAspirantDetails[];
}

export class Vote {
  @ApiProperty()
  memberId: string;
  @ApiProperty()
  aspirants: CreateAspirantDto[];
}
