import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogPostDocument = BlogPost & Document;

@Schema()
export class BlogPost {
  @Prop()
  title: string;

  @Prop()
  imageUrl: string;

  @Prop()
  category: string;

  @Prop()
  createdAt: string;

  @Prop()
  author: string;

  @Prop()
  slug: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
