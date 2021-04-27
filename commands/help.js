// response to "help": summarize commands and what to expect from the bot
const Discord = require('discord.js');

function helpMessage(message) {

  if(message.author.bot || !message.content === '--help') return;

  const helpMessageEmbed = new Discord.MessageEmbed()
    .setColor('#38000c')

    .setTitle('Description')
    .setAuthor('Shame-b0t', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4', 'https://github.com/Shame-B0t/Shame-Bot')
    .setDescription('Shame-bot is your personal productivity manager with an attitude. Use Shame-b0t to focus for a desired amount of time, with varying levels of strictness. ')

    .addField('note:', 'All commands must start with `--shame` and be followed by a “level of shame” and a time in the format of 00:00 (hours:minutes)')

    .addField('\u200B', '\u200B')

    .addFields(
      { name: 'Shame', value: 'The shame level will **not** bar you from any channels. If Shame-b0t catches you talking anywhere in discord, you will be publicly shamed by the bot' },
      { name: 'Isolation', value: 'The isolation level will take you to a new, private channel and bar you from accessing any other channel during the desired focus time.' },
      { name: 'Lockdown', value: 'The lockdown level will take you to a new, private channel and bar access from all other channels. In order to **exit early** on lockdown mode, you must first complete a typing challenge. To start the challenge type `--challenge` then begin typing the required amount of words.' }
    )

    .addField('\u200B', '\u200B')

    .addFields(
      { name: 'Comand Formats', value: 'Type in commands under this format, including your desired focus time' },
      { name: 'Shame', value: '``--focus shame 00:00``', inline: false },
      { name: 'Isolation', value: '`--focus isolation 00:00`', inline: false },
      { name: 'Lockdown', value: '`--focus lockdown 00:00`', inline: false },
      { name: 'You may EXIT at anytime by entering the command:', value: '`--exit`' }
    )

    .addField('\u200B', '\u200B')

    .addFields(
      { name: 'Away Messages', value: 'If another user tries to mention you in a comment, they will be sent an automated message notifying them that you are in focus mode' }
    )

    .setFooter('have a productive day!', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4');

  if(message.content.includes('--help')) message.channel.send(helpMessageEmbed);
}

module.exports = { helpMessage };
