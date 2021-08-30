import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Category extends mongoose.Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'post',
  })
  posts: [mongoose.Schema.Types.ObjectId];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
