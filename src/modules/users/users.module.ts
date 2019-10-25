import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';

import {User} from './users.entity';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {UsersResolver} from './users.resolver';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([ User ]), DefaultAdminModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('User', User);
  }
}
