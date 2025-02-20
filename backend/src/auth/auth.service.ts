import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.validate(email, password);

    const payload: JwtPayload = {
      email: user.email,
      _id: user._id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    return this.usersService.validate(email, password);
  }
  async validateUserByPayload(payload: JwtPayload) {
    return this.usersService.findByEmail(payload.email);
  }

  async validateUserFromGoogle(email: string): Promise<any> {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      const payload: JwtPayload = {
        email: existingUser.email,
        _id: existingUser._id,
        username: existingUser.username,
      };

      const token = this.jwtService.sign(payload);

      return { exists: true, token };
    } else {
      return { exists: false };
    }
  }
}
