import { Controller, Get, Param, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {UsersService} from './users.service';
import {User} from './users.entity';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    this.logger.log('get users called');
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    this.logger.log(`get user called with ${params.id} id`);
    return this.userService.getUser(params.id);
  }
}
