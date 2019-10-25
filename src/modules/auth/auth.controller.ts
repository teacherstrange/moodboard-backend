import { Body, Controller, HttpStatus, Logger, Post, Response } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUsers.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';

@Controller('/api/auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async loginUser(@Response() res: any, @Body() body: LoginUserDto) {
    this.logger.log('login user called');
    if (!(body && body.email && body.password)) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Username and password are required!',
      });
    }
    const user = await this.usersService.getByEmail(body.email);
    if (user) {
      if (await this.usersService.compareHash(
        body.password,
        user.password,
        user.salt)) {
        return res.status(HttpStatus.OK).json(
          {
            token: await this.authService.createToken(user.email, user.id),
            id: user.id,
          },
        );
      }
    }
    return res.status(HttpStatus.FORBIDDEN).json({
      message: 'Username or password wrong!',
    });
  }

  @Post('register')
  async registerUser(@Response() res: any, @Body() body: CreateUserDto) {
    this.logger.log('register user called');
    if (!(body && body.email && body.password)) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'email and password are required!',
      });
    }

    let user;
    try {
      user = await this.usersService.getByEmail(body.email);
    } catch (err) {
      this.logger.log('Error in lookup user');
    }

    if (user) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status: 400,
        property: 'email',
        message: 'Email already exists!',
      });
    } else {
      user = await this.usersService.createUser(body);
    }
    return res.status(HttpStatus.OK).json(
      {
        token: await this.authService.createToken(user.email, user.id),
        id: user.id,
      },
    );
  }
}
