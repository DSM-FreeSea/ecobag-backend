import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import * as mongoose from 'mongoose';

@Schema()
export class User extends mongoose.Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  uid: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'post',
  })
  posts: [mongoose.Schema.Types.ObjectId];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'comment',
  })
  comments: [mongoose.Schema.Types.ObjectId];

  @Prop({
    required: true,
    default: moment().format('YYYY-MM-DD'),
  })
  reg_date: string;

  @Prop({
    required: true,
    enum: ['admin', 'member', 'guest'],
    default: 'guest',
  })
  role: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'post',
  })
  liked_posts: [mongoose.Schema.Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
