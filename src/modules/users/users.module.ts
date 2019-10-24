import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {User} from './users.entity';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {UsersResolver} from './users.resolver';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([ User ])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
