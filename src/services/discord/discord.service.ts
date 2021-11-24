import { Injectable, Logger } from '@nestjs/common';
import { Client, Intents, Message, MessageEmbed } from 'discord.js';
import { PrismaService } from '../prisma.service';
import { DiscordEmbedError } from './discord.utils';

@Injectable()
export class DiscordService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger('DiscordService');
  bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });
  onModuleInit() {
    this.bot.login(process.env.BOT_TOKEN);
    this.bot.on('ready', () => {
      this.logger.debug(`Logged in discord as ${this.bot.user.tag}!`);
    });
    this.bot.on('message', (message) => {
      this.CommandHandler(message);
    });
  }

  async CommandHandler(message: Message<boolean>) {
    switch (message.content.toLowerCase()) {
      case 'oi':
        message.reply('gay');
        break;

      case 'listings':
        this.GetUserListings(message);
        break;

      case 'info':
        this.GetUserInfo(message);
        break;

      default:
        break;
    }
  }

  async GetUserListings(message: Message<boolean>) {
    const user = await this.prisma.user.findFirst({
      where: { discordId: message.author.id },
      include: {
        Listing: {
          where: { amount: { gt: 0 } },
          include: {
            product: true,
          },
        },
      },
    });
    if (!user)
      return message.reply({
        embeds: [DiscordEmbedError('Usuario nao cadastrado')],
      });
    let listings = '';
    user.Listing.forEach((list) => {
      listings += `📦 ${list.amount} ${list.product.name.slice(0, 30)} R$ ${
        list.unitPrice
      }\n\n`;
    });
    const embedMessage = new MessageEmbed()
      .setColor('#0099ff')
      .addFields({ name: 'Listings', value: listings })
      .setTimestamp();

    return message.reply({ embeds: [embedMessage] });
  }
  async GetUserInfo(message: Message<boolean>) {
    const user = await this.prisma.user.findFirst({
      where: { discordId: message.author.id },
      include: {
        UserHasProduct: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!user) return message.reply('Voce nao tem usuario cadastrado');
    let products = '';
    user.UserHasProduct.forEach((product) => {
      products += `📦 ${product.amount} ${product.product.name.slice(0, 30)}\n`;
    });
    const embedMessage = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('User profile')
      .setThumbnail(user.iconUrl)
      .addFields(
        { name: 'Name', value: `Nome: ${user.name}` },
        { name: 'Money', value: `💵 Money: ${user.money}` },
        { name: 'Inventory', value: products },
      )
      .setTimestamp();

    return message.reply({ embeds: [embedMessage] });
  }
}
