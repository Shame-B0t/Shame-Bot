const { botReplies } = require('../data/shameReplies');
const { changeNickname, restoreNickname } = require('../stretch/changeNickname');
const { isBotRoleHigher } = require('../utils/checkRoleStatus');
const { makeNewPrivateChannel } = require('../utils/newChannel');
const { overwriteChannelPerms } = require('../utils/overwriteChannelPerms');
const { isUserOwner, getUserRoles } = require('../utils/updateRoles');
// const { publiclyShame } = require('../utils/publiclyShame');


const PREFIX = '--';
const MODE_1 = 'shame';
const MODE_2 = 'isolation';
const MODE_3 = 'lockdown';

const usersArray = [];

// TODO consider nested setTimeouts, safer option than this 1s interval check

setInterval(() => {
  // let now = Date.now() ???
  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];
    if(user.endTime < Date.now() || user.isActive === false){ 

      usersArray.splice(i, 1);
      i--;

      if(user.isActive && !user.member.guild.owner){
        user.originalChannel.send(botReplies.timerEnded(user.userId));
        if(isBotRoleHigher({ member: user.member })) restoreNickname(user, user.member);
      }
      if(user.isActive && user.member.guild.owner)user.originalChannel.send(botReplies.timerEnded(user.userId)); 
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
    
    const parsedTime = 10000;

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
    };

    // assign mode based on user choice
    switch(mode){
      case MODE_1:
        // handle listening for new message differently?

        // publiclyShame(message);

        if(isBotRoleHigher(message)) changeNickname(message, userObj);
        
        // TODO make sure that publiclyShame has correct access to the usersArray, right now the user doens't get placed there until after the switch statement

        message.reply('DW placeholder confirmation that shame was selected');

        break;

      case MODE_2:
        if(isUserOwner(message)) {
          message.reply(botReplies.userIsOwner());
          return;
        }
       
        else if(!isBotRoleHigher(message)) {
          message.reply('Nope, sorry, you\'re too powerful for me. Try `shame` mode, or ask someone with administrative priveliges to move my role up in the hierarchy');
          return;
        }

        else {
          console.log('permissions cleared, continuing function');
          changeNickname(message, userObj);
  
          overwriteChannelPerms(message);
          makeNewPrivateChannel(client, message, parsedTime);
        }
        break;
      
      case MODE_3: {
        if(isUserOwner(message)) {
          message.reply(botReplies.userIsOwner());
          return;
        }

        else if(!isBotRoleHigher(message)) {
          message.reply('Nope, sorry, you\'re too powerful for me. Try `shame` mode, or ask someone with administrative priveliges to move my role up in the hierarchy');
          return;
        }
        console.log('permissions cleared, continuing function');
        changeNickname(message, userObj);

        overwriteChannelPerms(message);
        makeNewPrivateChannel(client, message, parsedTime);
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
