require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client(); // make an instance of the Client class as our 'client'



client.once('ready', () => {
	console.log('Good to go, boss!');
	// check for and make channel if needed
	// check for and make webhook if needed
});

client.login(process.env.TOKEN);  // makes a request to Discord API and logs in the bot, brings it online

client.on('message', message => {
	if (message.author.bot) return;

	if (message.content.includes('ping')) {
		const sender = message.author;
		
		function sayPongOnDelay(message) {
			if(message.author === sender) {
				message.reply('pong!');
				client.removeListener('message', sayPongOnDelay);
			}
		}

		client.on('message', sayPongOnDelay);
		
	};
});