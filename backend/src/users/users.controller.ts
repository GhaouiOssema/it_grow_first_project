import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    return this.usersService.create({ email, password, username });
  }

  @Post('register/google')
  async googleRegister(@Body() googleUserDto: CreateUserDto) {
    const { email, username } = googleUserDto;
    return this.usersService.createGoogleUser({ email, username });
  }
}
