import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/shared/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('goblin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: `Example payload: {'name': 'john doe', 'password': '123'}`,
  })
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return 'lol';
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Get('/discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth(@Req() req) {
    return 'lol';
  }

  @Get('/discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordAuthRedirect(@Req() req) {
    return this.authService.discordLogin(req);
  }
}
