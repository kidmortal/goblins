import { MessageEmbed } from 'discord.js';

export function DiscordEmbedError(message: string) {
  const embedMessage = new MessageEmbed()
    .setColor('#ED4134')
    .addFields({ name: 'Erro', value: message })
    .setTimestamp();
  return embedMessage;
}

export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return true;
}
