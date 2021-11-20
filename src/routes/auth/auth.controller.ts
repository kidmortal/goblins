import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

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
}
