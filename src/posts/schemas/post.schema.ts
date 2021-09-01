import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import * as mongoose from 'mongoose';

@Schema()
export class Post extends mongoose.Document {
  @Prop({
    required: true,
    index: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
    default: 0,
  })
  views: number;

  @Prop({
    required: true,
    default: 0,
  })
  likes: number;

  @Prop({
    required: true,
    default: 0,
  })
  unlikes: number;

  @Prop({
    required: true,
    default: moment().format('YYYY-MM-DD'),
  })
  date: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'comment',
  })
  comments: [mongoose.Schema.Types.ObjectId];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  })
  author: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
