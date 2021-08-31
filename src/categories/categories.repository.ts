import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async findAll() {
    return await this.categoryModel.find();
  }

  async findByName(name: string) {
    return await this.categoryModel.find().where({ name });
  }
}
