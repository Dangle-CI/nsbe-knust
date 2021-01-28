import { BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export interface MembersDto {
  id?: string;
  surname: string;
  otherNames: string;
  mobile?: string;
  email?: string;
  programme?: string;
  memberId: string;
  regDate?: Date;
  dob?: Date;
  gender?: string;
}

export class ConstructableBaseEntity extends BaseEntity {
  static construct(this: new () => any, params: Partial<any>): any {
    return Object.assign(new this(), params);
  }
}

export class MembersData {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  otherNames: string;
  @ApiProperty()
  mobile?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  programme?: string;
  @ApiProperty()
  memberId: string;
  @ApiProperty()
  regDate?: Date;
  @ApiProperty()
  dob?: Date;
  @ApiProperty()
  gender?: string;
}
