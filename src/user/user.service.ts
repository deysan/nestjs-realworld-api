import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto.js';
import type { UserResponse } from './types/userResponse.interface.js';
import { UserEntity } from './user.entity.js';

// Postgres error code for a unique constraint violation.
const UNIQUE_VIOLATION_CODE = '23505';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.ensureEmailAndUsernameAreFree(createUserDto);

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      // Two sign-ups with the same email can both pass the check above at the
      // same moment; the unique constraint in the database stops the second one.
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code === UNIQUE_VIOLATION_CODE
      ) {
        throw new UnprocessableEntityException('Email or username are taken');
      }
      throw error;
    }
  }

  private async ensureEmailAndUsernameAreFree({
    email,
    username,
  }: CreateUserDto): Promise<void> {
    // One query: WHERE email = $1 OR username = $2
    const existingUsers = await this.userRepository.find({
      where: [{ email }, { username }],
    });

    const errors: string[] = [];
    if (existingUsers.some((user) => user.email === email)) {
      errors.push('Email is already taken');
    }
    if (existingUsers.some((user) => user.username === username)) {
      errors.push('Username is already taken');
    }
    if (errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }
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
