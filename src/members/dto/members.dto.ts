import { BaseEntity } from 'typeorm';

export interface MembersDto {
  id?: string;
  surname: string;
  otherNames: string;
  mobile?: string;
  email?: string;
  programme?: string;
  memberId: string;
  regDate?: Date;
}

export class ConstructableBaseEntity extends BaseEntity {
  static construct(this: new () => any, params: Partial<any>): any {
    return Object.assign(new this(), params);
  }
}
