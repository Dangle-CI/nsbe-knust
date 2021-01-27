import { Module } from '@nestjs/common';
import { ElectionService } from './service/election.service';
import { ElectionController } from './controller/election.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionRepository } from './repository/election.repository';

@Module({
  controllers: [ElectionController],
  providers: [ElectionService],
  imports: [TypeOrmModule.forFeature([ElectionRepository]),
  ],
  exports: [ElectionService],
})
export class ElectionModule {
}
