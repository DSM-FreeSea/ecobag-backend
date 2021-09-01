import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findAll() {
    return await this.postModel.find();
  }

  async findById(id: string) {
    return await this.postModel.findById(id);
  }

  async findByUserId(id: string) {
    return await this.postModel.find({
      id,
    });
  }

  async create(payload: CreatePostDto) {
    return await this.postModel.create(payload);
  }
}
