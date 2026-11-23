import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';
import { LoginUserDto } from './dto/loginUser.dto.js';
import type { UserResponse } from './types/userResponse.interface.js';
import { UserService } from './user.service.js';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  // Login doesn't create anything, so answer 200 instead of POST's default 201.
  @HttpCode(HttpStatus.OK)
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
}
