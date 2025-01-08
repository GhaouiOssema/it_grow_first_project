import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt'; // or 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: {
    email: string;
    password: string;
    username: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userModel.create({ ...userData, password: hashedPassword });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Valid credentials, return user
    }
    return null; // Invalid credentials
  }
}
