// response to "help": summarize commands and what to expect from the bot
const Discord = require('discord.js');

function helpMessage(message) {

  if(message.author.bot || !message.content.toLowerCase() === '--help') return;

  const helpMessageEmbed = new Discord.MessageEmbed()
    .setColor('#38000c')

    .setAuthor('Shame-b0t', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4', 'https://github.com/Shame-B0t/Shame-Bot')

    .addField('note:', 'All commands must start with `--focus` and be followed by a “level of strictness" and a time in the format of 00:00 (hh:mm)')

    .addField('\u200B', '*Commands*')

    .addFields(
      { name: '\u200B', value: '`--focus shame 00:00`' },
      { name: '\u200B', value: '`--focus isolation 00:00`' },
      { name: '\u200B', value: '`--focus lockdown 00:00`' },
    )

    .addField('\u200B', '\u200B')

    .addFields(
      { name: 'EXIT anytime by entering the command:', value: '`--exit`' },
      { name: 'Check the TIME REMAINING by entering the command:', value: '`--time`' },
      { name: 'Activate a COUNTDOWN of time remaining by entering the command:', value: '`--countdown`' }

    )
    .addField('\u200B', '*For a full list of instructions and "strictness level" descriptions, enter* `--helpall`')

    .setFooter('have a productive day!', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4');

  if(message.content.toLowerCase() === '--help') message.channel.send(helpMessageEmbed);
}


function helpMessageFull(message) {

  if(message.author.bot || !message.content.toLowerCase() === '--helpall') return;

  const helpMessageFullEmbed = new Discord.MessageEmbed()
    .setColor('#38000c')

    .setAuthor('Shame-b0t', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4', 'https://github.com/Shame-B0t/Shame-Bot')
    .setDescription('Shame-b0t is your personal productivity manager with an attitude. Use Shame-b0t to focus for a desired amount of time, with varying levels of strictness. ')

    .addField('note:', 'All commands must start with `--focus` and be followed by a "level of strictness" and a time in the format of 00:00 (hh:mm)')

    .addField('\u200B', '*Levels of Strictness*')

    .addFields(
      { name: 'Shame', value: 'The shame level will **not** bar you from any channels. If Shame-b0t catches you talking anywhere in discord, you will be publicly shamed by the bot' },
      { name: '`--focus shame 00:00`', value: '\u200B', inline: false },
      { name: 'Isolation', value: 'The isolation level will take you to a new, private channel and bar you from accessing any other channel during the desired focus time.' },
      { name: '`--focus isolation 00:00`', value: '\u200B', inline: false },
      { name: 'Lockdown', value: 'The lockdown level will take you to a new, private channel and bar access from all other channels. In order to **exit early** on lockdown mode, you must first complete a typing challenge. To start the challenge, type `--challenge` followed by the required amount of words.' },
      { name: '`--focus lockdown 00:00`', value: '\u200B', inline: false },
    )

    .addField('\u200B', '\u200B')

    .addFields(
      { name: 'EXIT anytime by entering the command:', value: '`--exit`' },
      { name: 'Check the TIME REMAINING by entering the command:', value: '`--time`' },
      { name: 'Activate a COUNTDOWN of time remaining by entering the command:', value: '`--countdown`' }
    )

    .addField('\u200B', '\u200B')

    .addFields(
      { name: 'Away Messages', value: 'If another user tries to mention you in a comment, they will be sent an automated message notifying them that you are in focus mode' }
    )

    .setFooter('have a productive day!', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4');

  if(message.content.toLowerCase() === '--helpall') message.channel.send(helpMessageFullEmbed);
}

module.exports = { helpMessage, helpMessageFull };
