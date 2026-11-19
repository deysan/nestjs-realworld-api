import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';
import { UserEntity } from './user.entity.js';
import { UserService } from './user.service.js';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }
}
