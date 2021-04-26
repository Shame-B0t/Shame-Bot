// If any user mentions a user who is focusing, they will get an auto-reply that lets the non-focused user know that the focused user is in focus mode and what time focus mode will end.
const { msToString, remainingTime } = require('./parseTime');
const { usersArray } = require('../commands/start');


// consider passing usersArray in as arg to function
function autoReply(message) {
  if(!message.mentions.users || message.author.bot) return;
  
  //check all mentioned users to see if they are on list of focused users

  for(const mentionedUser of message.mentions.users) {
    const focusedUser = usersArray.find(focusedUser => focusedUser.userId === mentionedUser.id);

    if(focusedUser) {
      const endTime = remainingTime(focusedUser.endTime);
      const timeLeft = msToString(endTime);

      // send autoreply that they are focusing
      message.reply(`Sorry, this user is in focus mode currently. Their focus time ends in ${timeLeft}`);
    }
  }
  // if(message.mentions.users.has(focusedUser)) {
  //   const endTime = remainingTime(focusedUser.endTime);
  //   const timeLeft = msToString(endTime);
  //   // send autoreply that they are focusing
  //   message.reply(`Sorry, this user is in focus mode currently. Their focus time ends in ${timeLeft}`);
  // }
}
  
module.exports = { autoReply };
