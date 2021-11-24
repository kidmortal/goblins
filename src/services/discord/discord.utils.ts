import { MessageEmbed } from 'discord.js';

export function DiscordEmbedError(message: string) {
  const embedMessage = new MessageEmbed()
    .setColor('#ED4134')
    .addFields({ name: 'Erro', value: message })
    .setTimestamp();
  return embedMessage;
}
