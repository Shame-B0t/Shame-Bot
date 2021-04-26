// response to "help": summarize commands and what to expect from the bot

function helpMessage (message) {

	if (message.author.bot) return;
	if (message.content.includes('--help')) message.channel.send('Robinson!');
};

module.exports = { helpMessage };