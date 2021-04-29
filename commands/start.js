const { botReplies } = require('../data/shameReplies');
const { changeNickname } = require('../utils/changeNickname');
const { makeNewPrivateChannel } = require('../utils/newChannel');
const { makeChannelOverwrites } = require('../utils/overwriteChannelPerms');
const { isUserOwner } = require('../utils/updateRoles');
const { parseTime } = require('../utils/parseTime');
const { cleanUp, janitor } = require('../utils/endConditions');

const PREFIX = '--';
const MODE_1 = 'shame';
const MODE_2 = 'isolation';
const MODE_3 = 'lockdown';

const usersArray = [];

janitor(100, () => cleanUp(usersArray));

async function ifStart(message, client){

  if(message.content.toLowerCase().startsWith(PREFIX + 'focus')){
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
    const [mode, timeoutLength] = message.content.toLowerCase().split(' ').slice(1);

    if(mode !== MODE_1 && mode !== MODE_2 && mode !== MODE_3) return message.reply(botReplies.invalidStatus());
    
    if(!timeRegex.test(timeoutLength)) return message.reply(botReplies.invalidTime(mode));

    // const parsedTime = parseTime(timeoutLength);
    
    const parsedTime = 10000;

    // pushed all original channels one by one into a new array
    const startChannels = message.guild.channels.cache.filter(channel => !channel.name.endsWith('focus')).map(channel => channel);

    const startAdminRoles = message.member.roles.cache.filter(role => 
      role.permissions.has('ADMINISTRATOR')
    );

    const startNickname = message.member.nickname;

    const userObj = {
      userId: message.author.id,
      username: message.author.username,
      isActive: true,
      mode,
      startTime: Date.now(),
      endTime: Date.now() + parsedTime,
      originalChannel: message.channel,
      nickname: startNickname,
      member: message.member,
      guildChannels: startChannels,
      adminRoles: startAdminRoles
    };
    
    changeNickname(message, userObj);

    message.reply(botReplies.confirmFocusMode(mode, parsedTime));
    
    setTimeout(async () => {
      if(mode !== MODE_1){
        if(isUserOwner(message)) {
          message.reply(botReplies.userIsOwner());
          return;
        }
        await makeChannelOverwrites(message, userObj);
        await makeNewPrivateChannel(client, message, userObj);
      }
    }, 1000);
    

    usersArray.push(userObj);
  }
}

module.exports = {
  ifStart,
  usersArray,
};
