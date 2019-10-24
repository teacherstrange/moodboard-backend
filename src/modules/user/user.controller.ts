import { Controller, Get } from '@nestjs/common';
import UserService from './user.service';
import {User} from './user.entity';

@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
export default UserController;
