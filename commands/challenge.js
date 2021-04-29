const { checkChallenge } = require('../utils/timeInterrupt');
const { usersArray }  = require('./start');

function ifChallenge(message){
  if(message.author.bot) return;
  if(message.content.startsWith('--challenge')){
    for(let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i];

      if(message.author.id === user.userId && user.mode === 'lockdown'){
        checkChallenge(message, user);       
      }
      if(message.author.id === user.userId && user.mode !== 'lockdown'){
        message.reply('you are not in a mode which requires a challenge before exiting. To end your session early enter command --exit');      
      }
    }
  } 
}

module.exports = {
  ifChallenge,
};

