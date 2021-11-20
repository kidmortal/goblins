import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/shared/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('goblin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
