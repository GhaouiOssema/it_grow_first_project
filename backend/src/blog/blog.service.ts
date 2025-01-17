import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from './schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  // Fetch all blog posts from MongoDB
  async getPosts(): Promise<BlogPost[]> {
    return this.blogPostModel.find().exec();
  }
}
