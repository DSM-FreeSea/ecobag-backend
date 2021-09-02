import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../categories/categories.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postRepository.create(createPostDto);
  }

  async findAll() {
    return await this.postRepository.findAll();
  }

  async findOne(id: string) {
    return await this.postRepository.findById(id);
  }

  async findByUserId(id: string) {
    return await this.postRepository.findByUserId(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
