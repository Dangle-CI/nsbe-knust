import { Status } from '../../jwt/jwt.strategy';

export interface SignUpDto {
  username: string;
  password: string;
  email: string;
  mobile: string;
  status: Status
}

export interface LoginDto {
  username: string
  password: string
}
