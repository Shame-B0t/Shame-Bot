// If any user mentions a user who is focusing, they will get an auto-reply that lets the non-focused user know that the focused user is in focus mode and what time focus mode will end.
const { calculateEndTime } = require('./parseTime');

// take in a focused user and a message
function autoReply(focusedUser, message) {
  const endTime = calculateEndTime(focusedUser.endTime);
  
  if(!message.author.bot) {
    // if any message mentions the focused user, auto-reply to them
    if(message.mentions.users.has(focusedUser)) { 
      message.reply(`Sorry, this user is in focus mode currently. Their focus time ends in ${endTime}`);
      // Will need to make sure this matches how the data model looks
    }
  }
}
  
module.exports = { autoReply };
