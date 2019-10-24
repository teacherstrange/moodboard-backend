import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class CreateUserDto {
  @Field() readonly email: string;
  @Field() readonly firstName: string;
  @Field() readonly lastName: string;
  @Field() readonly password: string;
}
