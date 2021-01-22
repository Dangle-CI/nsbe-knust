import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MembersDto } from '../dto/members.dto';

@Entity()
export class Members extends BaseEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  surname: string;

  @ApiProperty()
  @Column()
  otherNames: string;

  @ApiProperty()
  @Column()
  @Index({ unique: true })
  mobile: string;

  @ApiProperty()
  @Index({ unique: true })
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  programme: string;

  @ApiProperty()
  @Column()
  memberId: string;

  @ApiProperty()
  @Column({ nullable: true })
  regDate: Date;
}
