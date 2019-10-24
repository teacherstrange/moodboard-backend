import { Field, InputType } from 'type-graphql';

@InputType()
class UserInput {
  @Field()
  readonly email: string;

  @Field({nullable: true})
  readonly firstName: string;

  @Field({nullable: true})
  readonly lastName: string;
}

export default UserInput;
