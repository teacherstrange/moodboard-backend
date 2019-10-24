import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { createHmac } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import {JwtPayload } from './jwt-payload.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  private privateKey = process.env.JWT_SECRET_KEY;
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async createToken(email: string, id: string) {
    this.logger.log('create Token');
    const user: JwtPayload = { email, id };

    const token = jwt.sign({user}, this.privateKey, {
      algorithm: 'RS256',
    });
    return {
      token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    this.logger.log('validate user:');
    this.logger.log(signedUser);
    if (signedUser && signedUser.email) {
      return Boolean(this.usersService.getByEmail(signedUser.email));
    }
    return false;
  }
}
