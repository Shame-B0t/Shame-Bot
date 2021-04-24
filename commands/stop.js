//  response to command "stop": interrupt and end the timeout that is affecting the user
const { usersArray }  = require('./start');


function ifExit(message){
  if(message.author.bot) return;
  if(message.content.startsWith('--exit')){
    for(let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i];

      if(message.author.id === user.userId && user.isActive === true){
        message.reply('you ended your timer early');
        user.isActive = false;
      }
    }
  }
  
 

  
}

module.exports = {
  ifExit,
};

