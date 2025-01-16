import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

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

    return await newUser.save();
  }

  generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async updateResetToken(userId: string, token: string): Promise<void> {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    await this.userModel.findByIdAndUpdate(userId, {
      resetToken: token,
      resetExpires: expirationDate,
    });
  }
}
