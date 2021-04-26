// If any user mentions a user who is focusing, they will get an auto-reply that lets the non-focused user know that the focused user is in focus mode and what time focus mode will end.
const { msToString } = require('./parseTime');
const { usersArray } = require('../commands/start');

function autoReply(mentionMessage) {
  const endTime = msToString(focusedUser.endTime);

  //check all mentioned users to see if they are on list of focused users
  const focusedUser = usersArray.map();
  if(mentionMessage.mentions.users.has(focusedUser)) {
    if(!mentionMessage.author.bot) {
      // send autoreply that they are focusing
      mentionMessage.reply(`Sorry, this user is in focus mode currently. Their focus time ends in ${endTime}`);
    }
  }
}
  
module.exports = { autoReply };
