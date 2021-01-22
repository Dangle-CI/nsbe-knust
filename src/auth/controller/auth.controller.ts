import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto, SignUpDto } from '../dto/auth.dto';
import { Auth } from '../entity/auth.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/new/user')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Auth> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<Auth> {
    return await this.authService.login(loginDto);
  }
}
