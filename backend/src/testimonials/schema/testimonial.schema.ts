import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Testimonial extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  quote: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  userId: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
