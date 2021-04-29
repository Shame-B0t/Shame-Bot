const { deleteChannel } = require('./newChannel');
const { removeChannelOverwrites } = require('./overwriteChannelPerms');
const { restoreNickname } = require('../utils/changeNickname');
const { botReplies } = require('../data/shameReplies');

const cleanUp = async (usersArray) => {
  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];
	
    // TODO maybe refactor here to divide up if blocks
    if(user.endTime < Date.now() || !user.isActive){ 
	
      restoreNickname(user, user.member);
	
      if(user.mode !== 'shame') {
        removeChannelOverwrites(user);
        deleteChannel(user.newChannel);
      } else {
        if(user.userSetTimer){
          user.botTimerMessage.delete();
        }
      }
	
      if(user.isActive){
        setTimeout(() => {
          
          user.originalChannel.send(botReplies.timerEnded(user.userId));
          
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
