import { Module } from '@nestjs/common';
import { VotersController } from './controller/voters.controller';
import { VotersService } from './service/voters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotersRepository } from './repository/voters.repository';
import { ElectionModule } from '../election/election.module';

@Module({
  controllers: [VotersController],
  providers: [VotersService],
  imports: [ElectionModule, TypeOrmModule.forFeature([VotersRepository])]
})
export class VotersModule {}
