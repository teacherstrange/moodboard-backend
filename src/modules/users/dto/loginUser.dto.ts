import { Field, ObjectType} from 'type-graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class LoginUserDto {

  @Field()
  @IsEmail(undefined, {
    message: 'email must be an email address.',
  })
  @IsNotEmpty({
    message: 'email field is required.',
  })
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty({
    message: 'password field is required.',
  })
  readonly password: string;
}
