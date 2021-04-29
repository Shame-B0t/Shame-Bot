// needs array of user objects
// each user object holds things that we pulled off of the original message

// needs to know end conditions
// --exit
// timer runs out
// completed challenge

// needs to know if user ended early or if timer ran out ??? we may be able to isolate this out

// FOR EACH USER as they hit end conditions:
// needs to restore user's nickname to original condition
	
// needs to know which mode a user is in
// if not shame mode
// restore channel permissions
// delete focus channel

// needs to send a timer is up message

// ** needs to remove user from user array **

const { deleteChannel } = require('./newChannel');
const { removeChannelOverwrites } = require('./overwriteChannelPerms');
const { restoreNickname } = require('../stretch/changeNickname');
const { botReplies } = require('../data/shameReplies');

const cleanUp = async (usersArray) => {
//   console.log(usersArray.map(user => user.nickname));

  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];
	
    // TODO maybe refactor here to divide up if blocks
    if(user.endTime < Date.now() || !user.isActive){ 
	
      if(!user.isActive){
        // if(isBotRoleHigher({ member: user.member }))
        restoreNickname(user, user.member);
        user.botTimerMessage.delete();

        if(user.mode !== 'shame') {
          console.log('exited early');
          removeChannelOverwrites(user);
          deleteChannel(user.newChannel);
        }
      }
	
      if(user.isActive && !user.member.guild.owner){
        user.originalChannel.send(botReplies.timerEnded(user.userId));
			
        // if(isBotRoleHigher({ member: user.member })) 
        restoreNickname(user, user.member);
        user.botTimerMessage.delete();
	
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
