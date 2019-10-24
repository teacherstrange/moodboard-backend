import { Body, Controller, HttpStatus, Logger, Post, Response } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from '../users/users.entity';

@Controller('/api/auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async loginUser(@Response() res: any, @Body() body: User) {
    this.logger.log('loginUser called');
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
          await this.authService.createToken(user.email, user.id),
        );
      }
    }
    return res.status(HttpStatus.FORBIDDEN).json({
      message: 'Username or password wrong!',
    });
  }

  @Post('register')
  async registerUser(@Response() res: any, @Body() body: User) {
    this.logger.log('register called');
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
        message: 'Email already exists!',
      });
    } else {
      user = await this.usersService.createUser(body);
    }
    return res.status(HttpStatus.OK).json(
      await this.authService.createToken(user.email, user.id),
    );
  }
}
