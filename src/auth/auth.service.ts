import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(uid: string, password: string): Promise<string | null> {
    const user = await this.usersService.findOne(uid);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user.uid;
    }
    return null;
  }

  async createToken(uid: string) {
    const payload = { uid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(payload: LoginDto) {
    console.log(payload.uid, payload.password);
    const res = await this.validateUser(payload.uid, payload.password);
    console.log(res);

    if (res === null) {
      throw new HttpException('Invalid user information', HttpStatus.NOT_FOUND);
    }

    return this.createToken(res);
  }
}
