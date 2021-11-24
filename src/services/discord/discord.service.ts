import { Injectable, Logger } from '@nestjs/common';
import { Client, Intents, Message, MessageEmbed } from 'discord.js';
import { PrismaService } from '../prisma.service';
import { DiscordEmbedError, isValidHttpUrl } from './discord.utils';

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
    const params = message.content.toLowerCase().split(' ');
    switch (params[0]) {
      case 'oi':
        message.reply('gay');
        break;

      case 'listings':
        this.GetUserListings(message);
        break;

      case 'info':
        this.GetUserInfo(message);
        break;
      case 'changeimage':
        this.ChangeUserImageUrl(message);
        break;
      case 'changemoney':
        this.ChangeTargetUserMoney(message);
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
        { name: 'Inventory', value: products || 'Sem itens' },
      )
      .setTimestamp();

    return message.reply({ embeds: [embedMessage] });
  }
  async ChangeUserImageUrl(message: Message<boolean>) {
    const params = message.content.split(' ');
    const url = params[1];
    const { id } = message.author;
    if (!url)
      return message.reply({ embeds: [DiscordEmbedError('Informe uma URL')] });

    if (!isValidHttpUrl(url)) {
      return message.reply({ embeds: [DiscordEmbedError('URL invalida')] });
    }
    const user = await this.prisma.user.findFirst({
      where: { discordId: id },
    });
    if (!user)
      return message.reply({
        embeds: [DiscordEmbedError('Usuario não registrado')],
      });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { iconUrl: url },
    });

    return message.reply('alterado!');
  }
  async ChangeTargetUserMoney(message: Message<boolean>) {
    const params = message.content.split(' ');
    const target = params[1].replace('<@!', '').replace('>', '');
    const newValue = Number(params[2]);

    const user = await this.prisma.user.findFirst({
      where: { discordId: target },
    });

    if (user && newValue) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          money: newValue,
        },
      });
      message.reply('ok!');
    }
  }
}
