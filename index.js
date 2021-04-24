require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client(); // make an instance of the Client class as our 'client'
const { ifStart } = require('./commands/start');
const { ifExit } = require('./commands/stop');


client.once('ready', () => {
  console.log('Good to go, boss!'); 
  // check for and make channel if needed
  // check for and make webhook if needed
});

client.login(process.env.TOKEN);

client.on('message', (message) => {
  ifStart(message, client); //!focus
  ifExit(message); //!exit
});



