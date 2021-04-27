// function to check remaining time on focus mode
const { usersArray } = require('./start');
const { msToString, remainingTime } = require('../utils/parseTime');


function timeCheck(message) {
  if(message.author.bot) return; 
  if(message.content.startsWith('--time')) {
  // check if user is in usersArray
    const focusedUser = usersArray.find(activeUser =>
      activeUser.userId === message.author.id);

    if(!focusedUser) return;
      
    
    // const focusedUser = usersArray.find(activeUser =>
    //   activeUser.userId === message.author.id) {
    //   for(let i = 0; i < usersArray.length; i++) {
    //     const user = usersArray[i];

    // pull endtime and compare to now to get timeLeft
    const endTime = focusedUser.endTime;
    const timeLeft = remainingTime(endTime);
    const timeLeftString = msToString(timeLeft);

    //   reply to message with time left
    message.reply(`You have ${timeLeftString} left.`);
  }
}


module.exports = { timeCheck };
