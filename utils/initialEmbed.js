const Discord = require('discord.js');

const initalEmbed = new Discord.MessageEmbed()
  .setColor('#38000c')

  .setAuthor('Shame-b0t', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4', 'https://github.com/Shame-B0t/Shame-Bot')

  .setTitle('Welcome to Shame-b0t')
  .setDescription('For the best user experience, please move Shame-b0t to the highest position in the list of roles for this server.')

  .addField('Server Settings > Roles', '\u200B')

  .setImage('https://i.ibb.co/QPHH189/Screen-Shot-2021-04-29-at-6-09-54-PM.png')




  .setFooter('have a productive day!', 'https://avatars.githubusercontent.com/u/83033726?s=200&v=4');


module.exports = { initalEmbed };
