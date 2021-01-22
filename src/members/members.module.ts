import { Global, Module } from '@nestjs/common';
import { MembersController } from './controller/members.controller';
import { MembersService } from './service/members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersRepository } from './repository/members.repository';

@Global()
@Module({
  providers: [MembersService],
  controllers: [MembersController],
  imports: [TypeOrmModule.forFeature([MembersRepository])],
  exports: [MembersService]
})
export class MembersModule {}
