// listens for target-user activity in non-approved channels and shames the user if any activity is detected
const { usersArray } = require('../commands/start');
const { shameRepliesArray } = require('../data/shameReplies');

function randomArrayIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function publiclyShame(message) {
  const focusedUser = usersArray.find(activeUser =>
    activeUser.userId === message.author.id
  );
        
  // if message.author = focusedUser 
  if(message.author !== focusedUser || message.author.bot) return;
  
  // replies to message with a random response from shameReplies.js
  const i = randomArrayIndex(shameRepliesArray);
  
  message.reply(shameRepliesArray[i]);
}

module.exports = { publiclyShame, randomArrayIndex };
