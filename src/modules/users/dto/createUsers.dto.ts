import { Field, ObjectType} from 'type-graphql';
import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class CreateUserDto {

  @Field()
  @IsEmail(undefined, {
    message: 'email must be an email address.',
  })
  @IsNotEmpty({
    message: 'email field is required.',
  })
  readonly email: string;

  @Field({nullable: true, defaultValue: ''})
  @IsOptional()
  @IsString({
    message: 'first name field is required.',
  })
  readonly firstName?: string;

  @Field({nullable: true, defaultValue: ''})
  @IsOptional()
  @IsString({
    message: 'last name field is required.',
  })
  readonly lastName?: string;

  @Field()
  @IsString()
  @IsNotEmpty({
    message: 'password field is required.',
  })
  readonly password: string;
}
