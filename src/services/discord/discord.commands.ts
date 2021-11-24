import { Message } from 'discord.js';

export function CommandHandler(message: Message<boolean>) {
  switch (message.content) {
    case 'oi':
      message.reply('gay');
      break;

    default:
      break;
  }
}
