import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') // This should match the route in Postman
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    return this.usersService.create({ email, password, username }); // Pass an object with email and password
  }
}
