// the bot configuration functionality
const { parseTime } = require('./parseTime');
const PREFIX = '--';


function ifStart(message){
  if(message.content.startsWith(PREFIX + 'focus')){
    const timeRegex = /^[0-9][0-9]:[0-9][1-9]$/;
    const [mode, timeoutLength] = message.content.split(' ').slice(1);
    if(!timeRegex.test(timeoutLength)) return message.reply(`enter a valid time format hh:mm in your request ex. "--focus ${mode} 01:00"`);
    const parsedTime = parseTime(timeoutLength);
    // const sender = message.author.username;
    // const isActive = true;
    // const shameLevel = 0;  
      
    switch(mode){
      case 'shame':
        break;
      case 'isolation':
        break;
      case 'lockdown':
        break;
      default: message.reply('not valid option, please type easy medium or sadistic'); 
        return;
    }
    message.reply(` your level of ${mode} has been set.`);
    message.reply(`amount of time ${parsedTime / 60000} mins`);
  }

}

module.exports = {
  ifStart,
};
