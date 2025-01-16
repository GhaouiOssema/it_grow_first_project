import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    if (!user) {
      throw new UnauthorizedException('Email does not exist');
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new UnauthorizedException('Incorrect password');
    }

    if (user && verifyPassword) {
      return user;
    }
    return null;
  }

  async findByGoogleId(googleId: string): Promise<User> {
    return this.userModel.findOne({ where: { googleId } });
  }

  async createGoogleUser(profile: any): Promise<User> {
    const newUser = new this.userModel({
      googleId: profile.googleId,
      email: profile.email,
      username: profile.username,
    });

    // Save the instance of the model
    return await newUser.save();
  }
}
