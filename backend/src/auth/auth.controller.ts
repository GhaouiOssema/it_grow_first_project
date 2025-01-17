import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidateUserDto } from './dto/validate-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }

  @Post('validate-user')
  async validateUser(@Body() validateUserDto: ValidateUserDto) {
    const { email } = validateUserDto;
    return this.authService.validateUserFromGoogle(email);
  }
}
