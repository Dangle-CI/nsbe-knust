import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Election extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Index({ unique: true })
  memberId: string;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @Column()
  position: string;

  @ApiProperty()
  @Column({nullable: true})
  votes: number = 0;
}
