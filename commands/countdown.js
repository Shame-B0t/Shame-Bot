// function to check remaining time on focus mode
const { botReplies } = require('../data/shameReplies');
const { usersArray } = require('./start');
// const { msToString, remainingTime } = require('../utils/parseTime');

function countdown(message) {
  if(message.author.bot) return; 
  if(message.content.startsWith('--countdown')) {
  // check if user is in usersArray
    const focusedUser = usersArray.find(activeUser =>
      activeUser.userId === message.author.id);
    if(focusedUser.userSetTimer){
      message.reply(botReplies.countdownTimer());
      return;
    } 
    focusedUser.userSetTimer = true;  

    if(!focusedUser) return;

    // pull endtime and compare to now to get timeLeft
    // const endTime = focusedUser.endTime;
    // const timeLeft = remainingTime(endTime);
    // const timeLeftString = msToString(timeLeft);
    // if time left < 1 min, show seconds

    //   reply to message with time left
    message.reply(`You have ${Math.ceil((focusedUser.endTime - Date.now()) / 1000)} secs left.`)
      .then(sentMessage => focusedUser.botTimerMessage = sentMessage);
    
  }
}

setInterval(() => {
  for(let i = 0; i < usersArray.length; i++) {
    const user = usersArray[i];
    if(user.userSetTimer){
      user.botTimerMessage.edit(`${user.nickname || user.username} you have ${Math.ceil((user.endTime - Date.now()) / 1000)} secs left`);
    }
  }
}, 1000);

module.exports = { 
  countdown
};
