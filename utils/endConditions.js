const { deleteChannel } = require('./newChannel');
const { removeChannelOverwrites } = require('./overwriteChannelPerms');
const { restoreNickname } = require('../utils/changeNickname');
const { botReplies } = require('../data/shameReplies');

const cleanUp = async (usersArray) => {
  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];
	
    // TODO maybe refactor here to divide up if blocks
    if(user.endTime < Date.now() || !user.isActive){ 
	
      if(!user.isActive){
        restoreNickname(user, user.member);

        if(user.mode !== 'shame') {
          console.log('exited early');
          removeChannelOverwrites(user);
          deleteChannel(user.newChannel);
        }
      }
	
      if(user.isActive && !user.member.guild.owner){
        user.originalChannel.send(botReplies.timerEnded(user.userId));
			
        restoreNickname(user, user.member);
	
        if(user.mode !== 'shame') {
          console.log('timer up');
          removeChannelOverwrites(user);
          deleteChannel(user.newChannel);
        }
      }
	
      if(user.isActive && user.member.guild.owner)user.originalChannel.send(botReplies.timerEnded(user.userId)); 
	
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
