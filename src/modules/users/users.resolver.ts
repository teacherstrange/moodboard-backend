import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {User} from './users.entity';
import {UsersInput} from './users.input';
import {UsersService} from './users.service';
import { UseGuards } from '@nestjs/common';
import { User as CurrentUser } from './users.decorator';
import {GqlAuthGuard} from '../auth/graphql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User, {nullable: true})
  public async user(@Args('id') id: number): Promise<User> {
    return  this.userService.getUser(id);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  public async getMe(@CurrentUser() user: User): Promise<User> {
    return  this.userService.getUser(parseInt(user.id, 10));
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UsersInput):
    Promise<User> {
    return  this.userService.createUser(input);
  }

  @Mutation(() => User)
  public async deleteUser(@Args('id') id: string): Promise<any> {
    return  this.userService.deleteUser(id);
  }
}
