import { Field, ObjectType} from 'type-graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType()
export class LoginUserDto {

  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsString()
  readonly password: string;
}
