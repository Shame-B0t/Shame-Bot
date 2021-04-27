// // listens for target-user activity in non-approved channels and shames the user if any activity is detected
// const { usersArray } = require('../commands/start');
// const { shameRepliesArray } = require('../data/shameReplies');

function randomArrayIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function publiclyShame(message) {
  if(message.author.bot || message.content.startsWith('--')) return;
  
  const focusedUser = usersArray.find(activeUser =>
    activeUser.userId === message.author.id
  );
  
  if(!focusedUser) return;
   
  // check if user is in usersArray && user.mode === MODE_1
  if(focusedUser && focusedUser.mode === 'shame') {
    // replies to message with a random response from shameReplies.js
    const i = randomArrayIndex(shameRepliesArray);
  
    message.reply(shameRepliesArray[i]);
  }
}

module.exports = { 
  publiclyShame, 
  randomArrayIndex 
};

