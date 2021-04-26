const { makeNewPrivateChannel } = require('../utils/newChannel');
const { createRole, deleteRole } = require('../utils/newRole');
const { assignNewRole, isUserOwner, getUserRoles, stripUserRoles, restoreUserRoles } = require('../utils/updateRoles');

const PREFIX = '--';

const usersArray = [];

// TODO experiment/test this length problem

setInterval(() => {
  // let now = Date.now() ???
  for(let i = 0; i < usersArray.length; i++){
    const user = usersArray[i];
    if(user.endTime < Date.now() || user.isActive === false){ 
      // CONSIDER only incrementing when not splicing to preserve i at the correct index/not skip things
      // TODO fix this logic so we aren't messing with the array length - filter??? indices will change ?
      usersArray.splice(i, 1);

      if(user.isActive) user.originalChannel.send(`<@${user.userId}>TIME IS UP`);
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
        message.reply('you are already in a productivity mode, enter --exit to end your session');
        return;
      }
    }

    const timeRegex = /^([0-9]|[1-9][0-9])([0-9]|[1-9][0-9]):([0-9]|[1-9][0-9])([0-9]|[1-9][0-9])$/;

    // pull mode and time args off message
    const [mode, timeoutLength] = message.content.split(' ').slice(1);

    if(mode !== 'shame' && mode !== 'isolation' && mode !== 'lockdown') return message.reply('Enter LALALALA: shame, isolation, or lockdown in this format, ex. "--focus isolation 01:00"');
    
    if(!timeRegex.test(timeoutLength)) return message.reply(`enter a valid time format hh:mm in your request ex. "--focus ${mode} 01:00"`);

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
      userRoles: getUserRoles(message)
    };

    // assign mode based on user choice
    switch(mode){
      case 'shame':
        // TODO publiclyShame.js
        break;
      case 'isolation':
        if(isUserOwner(message)) {
          message.reply('Sorry, you can\'t do this.');
          return;
        }

        makeNewPrivateChannel(client, message, parsedTime);

        await stripUserRoles(message, userObj.userRoles);

        createRole(message, 'TESTINGTESTING')
          .then(newRole => {
            assignNewRole(message, newRole);
            client.setTimeout(async () => {
              await deleteRole(message, newRole);
              await restoreUserRoles(message, userObj.userRoles);
            }, parsedTime);
          });
        break;
      
      case 'lockdown': {
        if(isUserOwner(message)) {
          message.reply('Sorry, you can\'t do this.');
          return;
        }

        makeNewPrivateChannel(client, message, parsedTime);

        await stripUserRoles(message, userObj.userRoles);

        createRole(message, 'TESTINGTESTING')
          .then(newRole => {
            assignNewRole(message, newRole);
            client.setTimeout(async () => {
              await deleteRole(message, newRole);
              await restoreUserRoles(message, userObj.userRoles);
            }, parsedTime);
          });
      }
      
        break;
      default: message.reply('Enter a valid status: shame, isolation, or lockdown in this format, ex. "--focus isolation 01:00"'); 
        return;
    }

    
    message.reply(`You are now in ${mode} mode.`);
    message.reply(`you will be restricted for ${parsedTime / 60000} mins`);

    usersArray.push(userObj);
   
  }

}

module.exports = {
  ifStart,
  usersArray,
};
