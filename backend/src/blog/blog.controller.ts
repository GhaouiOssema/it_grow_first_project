import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPost } from './schemas/blog.schema';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getPosts(): Promise<BlogPost[]> {
    return this.blogService.getPosts();
  }
}
