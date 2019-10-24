import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {User} from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
class UserService {

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

    await this.userRepository.save(user);
    return user;
  }

  async getUser(id: number): Promise<User> {
   return  await this.userRepository.findOne(id);
  }
}

export default UserService;
