import { Injectable, Logger } from '@nestjs/common';
import { Client, Intents } from 'discord.js';
import { CommandHandler } from './discord.commands';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger('DiscordService');
  bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });
  onModuleInit() {
    this.bot.login(process.env.BOT_TOKEN);
    this.bot.on('ready', () => {
      this.logger.debug(`Logged in discord as ${this.bot.user.tag}!`);
    });
    this.bot.on('message', CommandHandler);
  }
}
