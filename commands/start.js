const { botReplies } = require('../data/shameReplies');
const { changeNickname, restoreNickname } = require('../stretch/changeNickname');
const { isBotRoleHigher } = require('../utils/checkRoleStatus');
const { makeNewPrivateChannel, deleteChannel } = require('../utils/newChannel');
const { makeChannelOverwrites, removeChannelOverwrites } = require('../utils/overwriteChannelPerms');
const { isUserOwner, getUserRoles } = require('../utils/updateRoles');
// const { parseTime } = require('../utils/parseTime');

const PREFIX = '--';
const MODE_1 = 'shame';
const MODE_2 = 'isolation';
const MODE_3 = 'lockdown';

const usersArray = [];

// TODO consider nested setTimeouts, safer option than this 1s interval check

setInterval(async () => {
  // let now = Date.now() ???
  console.log(usersArray.map(user => user.username));
  
  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];

    // TODO maybe refactor here to divide up if blocks
    if(user.endTime < Date.now() || !user.isActive){ 

      if(!user.isActive){
        if(isBotRoleHigher({ member: user.member })) restoreNickname(user, user.member);
        // restore things!

        if(user.mode !== MODE_1) {
          await removeChannelOverwrites(user);
          deleteChannel(user.newChannel);
        }
      }

      if(user.isActive && !user.member.guild.owner){
        user.originalChannel.send(botReplies.timerEnded(user.userId));
        if(isBotRoleHigher({ member: user.member })) restoreNickname(user, user.member);

        if(user.mode !== MODE_1) {
          await removeChannelOverwrites(user);
          deleteChannel(user.newChannel);
        }
      }
      
      if(user.isActive && user.member.guild.owner)user.originalChannel.send(botReplies.timerEnded(user.userId)); 

      usersArray.splice(i, 1);
      i--;

    }
  }
  // console.log(usersArray.map(user => user.username));
}, 1000);

async function ifStart(message, client){

  if(message.content.startsWith(PREFIX + 'focus')){
    // checking to see if user is already tracked/focusing
    for(let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i];
      if(message.author.id === user.userId) {
        message.reply(botReplies.alreadyInAMode());
        return;
      }
    }

    const timeRegex = /^([0-9]|[1-9][0-9])([0-9]|[1-9][0-9]):([0-9]|[1-9][0-9])([0-9]|[1-9][0-9])$/;

    // pull mode and time args off message
    const [mode, timeoutLength] = message.content.split(' ').slice(1);

    if(mode !== MODE_1 && mode !== MODE_2 && mode !== MODE_3) return message.reply(botReplies.invalidStatus());
    
    if(!timeRegex.test(timeoutLength)) return message.reply(botReplies.invalidTime(mode));

    // const parsedTime = parseTime(timeoutLength);
    
    const parsedTime = 15000;

    // pushed all original channels one by one into a new array
    const startChannels = message.guild.channels.cache.map(channel => channel);

    const userObj = {
      userId: message.author.id,
      username: message.author.username,
      isActive: true,
      mode,
      startTime: Date.now(),
      endTime: Date.now() + parsedTime,
      originalChannel: message.channel,
      userRoles: getUserRoles(message),
      nickname: message.member.nickname,
      member: message.member,
      guildChannels: startChannels
    };

    // assign mode based on user choice
    switch(mode){
      case MODE_1:

        if(isBotRoleHigher(message)) changeNickname(message, userObj);

        break;
        
      case MODE_2:
        if(isUserOwner(message)) {
          message.reply(botReplies.userIsOwner());
          return;
        }
       
        else if(!isBotRoleHigher(message)) {
          message.reply(botReplies.tooPowerful());
          return;
        }

        else {
          console.log('permissions cleared, continuing function');
          changeNickname(message, userObj);
  
          // check admin roles and make overwrites
          await makeChannelOverwrites(message, userObj);
          
          await makeNewPrivateChannel(client, message, userObj);

          // overwriteChannelPerms(message, parsedTime);
          // makeNewPrivateChannel(client, message, userObj);
        }
        break;
      
      case MODE_3: {
        if(isUserOwner(message)) {
          message.reply(botReplies.userIsOwner());
          return;
        }

        else if(!isBotRoleHigher(message)) {
          message.reply(botReplies.tooPowerful());
          return;
        }
        console.log('permissions cleared, continuing function');
        changeNickname(message, userObj);

        makeChannelOverwrites(message, userObj)
          .then(() => makeNewPrivateChannel(client, message, userObj));
      }
        break;

      default: message.reply(botReplies.invalidStatus()); 
        return;
    }
    
    message.reply(botReplies.confirmMode(mode));
    message.reply(botReplies.confirmTime(parsedTime));

    usersArray.push(userObj);
   
  }

}

module.exports = {
  ifStart,
  usersArray,
};
