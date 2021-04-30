//  response to command "--exit": interrupt and end the timeout that is affecting the user
const { botReplies } = require('../data/shameReplies');
const { presentChallenge } = require('../utils/challengeData');
const { usersArray }  = require('./start');

function ifExit(message){
  if(message.author.bot) return;
  if(message.content.toLowerCase().startsWith('--exit')){
    for(let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i];

      if(message.author.id === user.userId && user.mode !== 'lockdown'){
        message.reply(botReplies.timerEndedEarly());
        user.isActive = false;
      }
      if(message.author.id === user.userId && user.mode === 'lockdown'){
        presentChallenge(message, user.userId);
      }
    }
  }  
}

module.exports = {
  ifExit
};

