import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: false, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  resetToken: string;

  @Prop({ type: Date, default: null })
  resetExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
