import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {User} from './user.entity';
import UserInput from './user.input';
import UserService from './user.service';

@Resolver()
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User, {nullable: true})
  public async user(@Args('id') id: number): Promise<User> {
    return  this.userService.getUser(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput):
    Promise<User> {
    return  this.userService.createUser(input);
  }
}
export default UserResolver;
