// listens for target-user activity in non-approved channels and shames the user if any activity is detected
const { usersArray } = require('../commands/start');
const { shameRepliesArray } = require('../data/shameReplies');

function publiclyShame(message) {
  const focusedUser = usersArray.find(activeUser =>
    activeUser.userId === message.author.id
  );
        
  // if message.author = focusedUser 
  if(message.author !== focusedUser || message.author.bot) return;
  
  // message.reply message.content comes from shameReplies.js
  const i = responseNumber.length - 1;
  const responseNumber = Math.random(i);
  
  message.reply(shameRepliesArray[responseNumber]);
}

module.exports = { publiclyShame };
