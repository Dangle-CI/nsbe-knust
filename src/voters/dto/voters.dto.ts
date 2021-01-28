import { ApiProperty } from '@nestjs/swagger';
import { MembersData } from '../../members/dto/members.dto';
import { GetAspirantDetails } from '../../election/dto/election.dto';

export class VoterDetails {
  @ApiProperty()
  id: number;
  @ApiProperty()
  voterDetails?: MembersData;
  @ApiProperty()
  aspirants?: GetAspirantDetails[];
}

export class Vote {
  @ApiProperty()
  memberId: string;
  // @ApiProperty()
  // aspirants: CreateAspirantDto[];
}
