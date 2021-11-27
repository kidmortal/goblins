import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
      callbackURL: process.env.DISCORD_CALLBACKURL,
      scope: ['email', 'identify'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: any,
  ): Promise<any> {
    cb(null, profile);
  }
}
