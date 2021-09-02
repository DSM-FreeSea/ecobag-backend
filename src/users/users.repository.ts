import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(payload: CreateUserDto) {
    return await this.userModel.create(payload);
  }

  async findByUserId(uid: string, exclude: string = null) {
    return await this.userModel.findOne().where({ uid }).select(exclude);
  }

  async findByUserIdAndUpdate(uid: string, UpdateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({ uid }, UpdateUserDto);
  }

  async findByUserIdAndDelete(uid: string) {
    return await this.userModel.findOneAndRemove({ uid });
  }
}
