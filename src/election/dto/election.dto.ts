import { MembersData } from '../../members/dto/members.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAspirantDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  memberId: string;
  @ApiProperty()
  image: any;
}

export class GetAspirantDetails {
  @ApiProperty()
  id: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  memberId: string;
  @ApiProperty()
  memberDetails: MembersData;
}

export class GCSDto {
  @ApiProperty()
  fieldname: string;
  @ApiProperty()
  originalname: string;
  @ApiProperty()
  encoding: string;
  @ApiProperty()
  mimetype: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  filename: string;
}
