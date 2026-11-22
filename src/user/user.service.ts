import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto.js';
import type { UserResponse } from './types/userResponse.interface.js';
import { UserEntity } from './user.entity.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  generateJwt(user: UserEntity): string {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  buildUserResponse(user: UserEntity): UserResponse {
    return {
      user: {
        email: user.email,
        token: this.generateJwt(user),
        username: user.username,
        bio: user.bio,
        image: user.image,
      },
    };
  }
}
