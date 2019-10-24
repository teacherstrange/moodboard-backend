import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {User} from './users.entity';
import { CreateUserDto } from './users.dto';
import { createHmac } from 'crypto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = data.password;
    await this.userRepository.save(user);
    return user;
  }

  async getUser(id: number): Promise<User> {
   return  await this.userRepository.findOne(id);
  }

  async deleteUser(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async getByEmail(email: string): Promise<User> {
    return  await this.userRepository.findOne(email);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
    salt: string | undefined): Promise<boolean> {
    try {
      const tempPassword = createHmac('sha1', salt)
        .update(password)
        .digest('hex');
      if (hash === tempPassword) {
        this.logger.log('verification of user sucessful');
        return true;
      } else {
        this.logger.log('verification failed');
        return false;
      }
    } catch (err) {
      this.logger.log('argon2 error');
      return false;
    }
  }
}
