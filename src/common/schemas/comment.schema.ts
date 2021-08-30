import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import * as mongoose from 'mongoose';

@Schema()
export class Comment extends mongoose.Document {
  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  date: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  })
  post: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  })
  creator: mongoose.Schema.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
