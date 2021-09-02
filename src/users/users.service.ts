import { Injectable } from '@nestjs/common';
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

  async update(uid: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.findByUserIdAndUpdate(uid, updateUserDto);
  }

  async remove(uid: string) {
    return await this.usersRepository.findByUserIdAndDelete(uid);
  }
}
