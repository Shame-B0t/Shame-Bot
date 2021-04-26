// If any user mentions a user who is focusing, they will get an auto-reply that lets the non-focused user know that the focused user is in focus mode and what time focus mode will end.
const { msToString, remainingTime } = require('./parseTime');
const { usersArray } = require('../commands/start');


// consider passing usersArray in as arg to function
function autoReply(mentionMessage) {
  //check all mentioned users to see if they are on list of focused users
  const focusedUser = usersArray.map(
    //work through array to see if user is in the list
    // mentionMessage.mentions.users === whatever naming convention is
  );

  if(mentionMessage.mentions.users.has(focusedUser) && !mentionMessage.author.bot) {
    const endTime = remainingTime(focusedUser.endTime);
    const timeLeft = msToString(endTime);
    // send autoreply that they are focusing
    mentionMessage.reply(`Sorry, this user is in focus mode currently. Their focus time ends in ${timeLeft}`);
  }
}
  
module.exports = { autoReply };
