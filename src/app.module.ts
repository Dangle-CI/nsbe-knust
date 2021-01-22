import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { MembersModule } from './members/members.module';
import { ElectionModule } from './election/election.module';
import { VotersModule } from './voters/voters.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, MembersModule, ElectionModule, VotersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
