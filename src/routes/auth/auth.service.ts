import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByName(username);
    if (user && user.password === pass) {
      const returnUser = { ...user };
      delete returnUser.password;
      return returnUser;
    }
    return null;
  }
  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  googleLogin(req) {
    if (!req.user) {
      return 'no user from google';
    }
    return {
      message: 'user info from google',
      user: req.user,
    };
  }
}
