import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 13);
    return this.usersRepository.create(createUserDto);
  }

  async findOne(uid: string) {
    return await this.usersRepository.findByUserId(uid);
  }

  async findOneWithoutPw(uid: string) {
    return await this.usersRepository.findByUserId(uid, '-password');
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    if (
      !(
        'name' in updateUserDto ||
        'email' in updateUserDto ||
        'password' in updateUserDto
      ) ||
      'uid' in updateUserDto
    ) {
      throw new BadRequestException();
    }

    const res = await this.usersRepository.findByUserIdAndUpdate(
      uid,
      updateUserDto,
    );
    if (!res) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(uid: string) {
    return await this.usersRepository.findByUserIdAndDelete(uid);
  }
}
