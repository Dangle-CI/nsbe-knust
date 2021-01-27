import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { MembersModule } from './members/members.module';
import { ElectionModule } from './election/election.module';
import { VotersModule } from './voters/voters.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, MembersModule, ElectionModule, VotersModule, MulterModule.register({
    dest: './images/aspirants',
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
}
