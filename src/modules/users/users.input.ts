import { Field, InputType } from 'type-graphql';

@InputType()
export class UsersInput {
  @Field()
  readonly email: string;

  @Field({nullable: true})
  readonly firstName: string;

  @Field({nullable: true})
  readonly lastName: string;

  @Field()
  readonly password: string;
}
