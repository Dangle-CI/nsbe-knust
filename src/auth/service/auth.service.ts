import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';
import { LoginDto, SignUpDto } from '../dto/auth.dto';
import { Auth } from '../entity/auth.entity';
import * as Argon2 from 'argon2';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(AuthRepository) private authRepository: AuthRepository) {
  }

  async signUp(authDto: SignUpDto): Promise<Auth> {
    const user = new Auth();
    user.email = authDto.email;
    user.username = authDto.username;
    user.status = authDto.status;
    user.mobile = authDto.mobile;
    user.password = await Argon2.hash(authDto.password);

    const auth = await this.authRepository.signUp(user);
    delete auth.password;
    return auth;
  }

  async login(loginDto: LoginDto): Promise<Auth> {
    const { username, password } = loginDto;
    const user = await this.authRepository.findOne({ username });
    if (user && await Argon2.verify(user.password, password)) {
      delete user.password;
      return user;
    } else throw new UnauthorizedException({ message: 'Username or Password is incorrect' });
  }
}
