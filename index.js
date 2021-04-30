require('dotenv').config();
const { ifChallenge } = require('./commands/challenge');
const { ifStart } = require('./commands/start');
const { helpMessage, helpMessageFull } = require('./commands/help');
const { ifExit } = require('./commands/stop');
const { autoReply } = require('./utils/autoReply');
const { randomMeme } = require('./utils/randomMeme');
const { publiclyShame } = require('./utils/publiclyShame');
const { timeCheck } = require('./commands/time');
const { countdown } = require('./commands/countdown');
const { initialEmbed } = require('./utils/initialEmbed');

const Discord = require('discord.js');

const client = new Discord.Client(); 

client.once('ready', () => {
  console.log('Good to go, boss!');

  client.user.setActivity('over you | type --help', { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});

client.login(process.env.TOKEN);

client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text');
  channel.send(initialEmbed);
});

client.on('message', (message) => {
  ifStart(message, client); //--focus
  autoReply(message); // check mentions
  publiclyShame(message); // listen for shamed user message
  ifExit(message); //--exit
  ifChallenge(message); //--challenge
  timeCheck(message); //--time
  helpMessage(message); //--help
  helpMessageFull(message); //--helpall
  randomMeme(message); // --meme
  countdown(message); // --countdown
});
