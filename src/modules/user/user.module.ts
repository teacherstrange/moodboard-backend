import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {User} from './user.entity';
import UserController from './user.controller';
import UserService from './user.service';
import UserResolver from './user.resolver';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([ User ])],
  providers: [UserService, UserResolver],
})
export default class UserModule {}
