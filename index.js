require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Good to go, boss!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.author.bot) return;
	if (message.content.includes('ping')) message.reply('pong!');
});
