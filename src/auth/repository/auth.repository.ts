import { EntityRepository, Repository } from 'typeorm';
import { Auth } from '../entity/auth.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async signUp(user: Auth): Promise<Auth> {
    try {
      await user.save();
      return user;
    } catch (e) {
      if (e.code === '23505' || 'ER_DUP_ENTRY') throw new ConflictException('Username already exist');
      else throw new InternalServerErrorException();
    }
  }
}
