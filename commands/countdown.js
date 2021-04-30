// function to check remaining time on focus mode
const { botReplies } = require('../data/shameReplies');
const { usersArray } = require('./start');
const { remainingTime, msToString } = require('../utils/parseTime');

function countdown(message) {
  if(message.author.bot) return; 
  if(message.content.startsWith('--countdown')) {
  // check if user is in usersArray
    const focusedUser = usersArray.find(activeUser =>
      activeUser.userId === message.author.id);
      
    if(!focusedUser) return;
      
    if(focusedUser.userSetTimer){
      message.reply(botReplies.countdownTimer());
      return;
    } 
    focusedUser.userSetTimer = true;  


    //   reply to message with time left
    const timeLeft = remainingTime(focusedUser.endTime);
    const timeLeftString = msToString(timeLeft);
    // if over a minute update every minute. If less, every second?
    message.reply(`You have ${timeLeftString} left.`)
      .then(sentMessage => focusedUser.botTimerMessage = sentMessage);
    
  }
}

setInterval(() => {
  for(let i = 0; i < usersArray.length; i++) {
    const user = usersArray[i];
    if(user.userSetTimer){
      const timeLeft = remainingTime(user.endTime);
      const timeLeftString = msToString(timeLeft);
    
      user.botTimerMessage.edit(`${user.nickname || user.username} you have ${timeLeftString} left`);
    }
  }
}, 3000);

module.exports = { 
  countdown
};
