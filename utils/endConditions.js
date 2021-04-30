const { deleteChannel } = require('./newChannel');
const { removeChannelOverwrites } = require('./overwriteChannelPerms');
const { restoreNickname } = require('../utils/changeNickname');
const { botReplies } = require('../data/shameReplies');

/*
takes in an array of currently stored user objects and iterates through it
checks whether the user's time has expired || whether the user has issued the --exit command
sets nickname back to original state
removes the permission overwrites that are blocking channels
deletes the user's private focus channel
deletes the countdown timer from the public channel if one was triggered
if the user did not exit early, sends a message indicating their time is up
removes the user object from the array
decrements i to keep the indices in order after splicing out user
*/

const cleanUp = async (usersArray) => {
  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];
    
    if(user.endTime < Date.now() || !user.isActive){ 
	
      await restoreNickname(user, user.member); 
	
      if(user.mode !== 'shame') {
        await removeChannelOverwrites(user);
        await deleteChannel(user.newChannel); 
      } else {
        // might want to test out some refactoring on this else block
        if(user.userSetTimer){
          await user.botTimerMessage.delete(); 
        }
      }
	
      if(user.isActive){
        setTimeout(async () => {
          await user.originalChannel.send(botReplies.timerEnded(user.userId)); 
        }, 1000);
      }
	
      usersArray.splice(i, 1); 
      i--; 
    }
  }
};

// makes a stable cleanup loop - waits for itself to finish before running again
const janitor = (timeout, callback) => {
  setTimeout(async () => {
    await callback();
    janitor(timeout, callback);
  }, timeout);
};

module.exports = { cleanUp, janitor };
