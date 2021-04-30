// function to check remaining time on focus mode
const { usersArray } = require('./start');
const { botReplies } = require('../data/shameReplies');

function timeCheck(message) {
  if(message.author.bot) return; 
  if(message.content.toLowerCase().startsWith('--time')) {
  // check if user is in usersArray
    const focusedUser = usersArray.find(activeUser =>
      activeUser.userId === message.author.id);

    if(!focusedUser) return;

    //   reply to message with time left
    message.reply(botReplies.timeCheck(focusedUser));
  }
}

module.exports = { timeCheck };
