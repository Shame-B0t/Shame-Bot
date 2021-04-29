const { botReplies } = require('../data/shameReplies');
const { checkChallenge } = require('../utils/challengeData');
const { usersArray }  = require('./start');

function ifChallenge(message){
  if(message.author.bot) return;
  if(message.content.toLowerCase().startsWith('--challenge')){
    for(let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i];

      if(message.author.id === user.userId && user.mode === 'lockdown'){
        checkChallenge(message, user);       
      }
      if(message.author.id === user.userId && user.mode !== 'lockdown'){
        message.reply(botReplies.noChallenge());      
      }
    }
  } 
}

module.exports = {
  ifChallenge,
};

