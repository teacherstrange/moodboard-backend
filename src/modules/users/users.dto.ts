import { Field, ObjectType} from 'type-graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType()
export class CreateUserDto {

  @IsEmail()
  @Field()
  readonly email: string;

  @IsString()
  @Field()
  readonly firstName?: string;

  @IsString()
  @Field()
  readonly lastName?: string;

  @IsString()
  @Field()
  readonly password: string;
}
