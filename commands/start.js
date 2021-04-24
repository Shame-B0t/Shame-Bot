// the bot configuration functionality
const { makeNewPrivateChannel } = require('../utils/newChannel');
const { parseTime } = require('../utils/parseTime');
// const { ifExit } = require('./stop');
const PREFIX = '--';

const usersArray = [];

setInterval(() => {
  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];
    if(user.endTime < Date.now() || user.isActive === false){
      usersArray.splice(i, 1);

    }
  }
}, 1000);

function ifStart(message, client){

  if(message.content.startsWith(PREFIX + 'focus')){
    for(let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i];
      if(message.author.id === user.userId) return message.reply('you are already in a productivity mode, enter --exit to end your session');
    }
    const timeRegex = /^([0-9]|[1-9][0-9])([0-9]|[1-9][0-9]):([0-9]|[1-9][0-9])([0-9]|[1-9][0-9])$/;

    const [mode, timeoutLength] = message.content.split(' ').slice(1);

    if(!timeRegex.test(timeoutLength)) return message.reply(`enter a valid time format hh:mm in your request ex. "--focus ${mode} 01:00"`);

    const parsedTime = parseTime(timeoutLength);
      
    switch(mode){
      case 'shame':
        break;
      case 'isolation': makeNewPrivateChannel(client, message);
        break;
      case 'lockdown': makeNewPrivateChannel(client, message);
        break;
      default: message.reply('Enter a valid status: shame, isolation, or lockdown is this format, ex. "--focus isolation 01:00"'); 
        return;
    }

    const userObj = {
      userId: message.author.id,
      username: message.author.username,
      isActive: true,
      startTime: Date.now(),
      endTime: Date.now() + parsedTime,
    
    };
    message.reply(`You are now in ${mode} mode.`);
    message.reply(`you will be restricted for ${parsedTime / 60000} mins`);

    usersArray.push(userObj);
    console.log('when start', usersArray);
   
  }

}

module.exports = {
  ifStart,
  usersArray,
};
