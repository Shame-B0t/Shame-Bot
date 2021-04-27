// If any user mentions a user who is focusing, they will get an auto-reply that lets the non-focused user know that the focused user is in focus mode and what time focus mode will end.
const { msToString, remainingTime } = require('./parseTime');
const { usersArray } = require('../commands/start');
const { botReplies } = require('../data/shameReplies');


// consider passing usersArray in as arg to function
function autoReply(message) {
  if(!message.mentions.users || message.author.bot) return;
  
  //check all mentioned users to see if they are on list of focused users
  for(const mentionedUser of message.mentions.users) {
    
    const focusedUser = usersArray.find(activeUser =>
      activeUser.userId === mentionedUser[1].id
    );
    
    if(focusedUser) {
      const endTime = remainingTime(focusedUser.endTime);
      const timeLeft = msToString(endTime);

      // send autoreply that they are focusing
      message.reply(botReplies.autoReplyToSender(timeLeft));
    }
  }
}
  
module.exports = { autoReply };
