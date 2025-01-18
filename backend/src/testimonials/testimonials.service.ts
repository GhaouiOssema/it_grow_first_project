// src/testimonials/testimonials.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from './schema/testimonial.schema';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name) private testimonialModel: Model<Testimonial>,
  ) {}

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialModel.find().exec();
  }
}
