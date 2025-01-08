import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  async login(email: string, password: string) {
    // Validate the user with email and password
    const user = await this.usersService.validate(email, password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // If user is valid, create the JWT token
    const payload: JwtPayload = { email: user.email }; // Adjust payload as needed
    const accessToken = this.jwtService.sign(payload); // Sign the payload to generate JWT token

    return {
      message: 'Login successful',
      access_token: accessToken, // Include the token in the response
      user: user, // Optionally, you can include the user info too
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    return this.usersService.validate(email, password);
  }
  async validateUserByPayload(payload: JwtPayload) {
    return this.usersService.findByEmail(payload.email); // You can find the user by their email or any other identifier
  }
}
