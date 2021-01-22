import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  @Index({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ nullable: true })
  @Index({ unique: true })
  mobile: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty({ enum: ['ADMIN', 'STAFF'] })
  @Column()
  status: string;

  @Column({ nullable: true })
  @ApiProperty()
  @Index({ unique: true })
  email: string;
}
