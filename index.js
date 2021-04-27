require('dotenv').config();
const Discord = require('discord.js');
const { ifChallenge } = require('./commands/challenge');
const client = new Discord.Client(); 
const { ifStart } = require('./commands/start');
const { helpMessage } = require('./commands/help');
const { ifExit } = require('./commands/stop');
const { autoReply } = require('./utils/autoReply');
const { publiclyShame } = require('./utils/publiclyShame');
const { timeCheck } = require('./commands/time');

// const { overwriteChannelPerms } = require('./utils/overwriteChannelPerms');

client.once('ready', () => {
  console.log('Good to go, boss!');

  client.user.setActivity('over you | type --help', { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);

});

client.login(process.env.TOKEN);

client.on('message', (message) => {
  ifStart(message, client); //--focus
  autoReply(message); // check mentions
  publiclyShame(message); // listen for shamed user message
  ifExit(message); //--exit
  ifChallenge(message); //--challenge
  timeCheck(message); //--time
  helpMessage(message); //--help
});
