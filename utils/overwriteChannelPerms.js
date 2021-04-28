const isUserAdmin = (member) => {
  return member.permissions.has('ADMINISTRATOR') ? true : false;
};

const makeChannelOverwrites = (message, userObj) => {
  const { guild, author, member } = message;
  const { channels } = guild;
  const adminRoles = [];
  userObj.guildChannels = channels.cache;
  
  if(isUserAdmin(member)) {
    member.roles.cache.forEach(role => {
      if(role.permissions.has('ADMINISTRATOR')) {
        adminRoles.push(role);
        member.roles.remove(role);
      }
    });
  }

  userObj.adminRoles = adminRoles;

  userObj.guildChannels.forEach(channel => {
    channel.createOverwrite(author.id, {
      'VIEW_CHANNEL': false
    })
      .catch(() => {
        console.log(`No overwrite performed in ${channel.name}`);
      });
  });
};

const removeChannelOverwrites = (userObj) => {

  const { guildChannels, userId, adminRoles, member } = userObj;

  guildChannels.forEach(channel => {
    try {
      channel.permissionOverwrites.get(userId).delete();
        
      // admin check to see if roles should be restored, then restore roles
      if(adminRoles.length) adminRoles.forEach(role => member.roles.add(role));
    }
    catch(error) {
      console.log(`No delete of overwrites in ${channel.name}`);
    }
  });
};



// const overwriteChannelPerms = ({ guild, author, member }, timeOut) => {
//   const { channels } = guild;
//   const originalChannels = channels.cache;
  
//   if(isUserAdmin(member)) {
//     const adminRoles = [];
    
//     member.roles.cache.forEach(role => {
//       if(role.permissions.has('ADMINISTRATOR')) {
//         adminRoles.push(role);
//         member.roles.remove(role);
//       }
//     });
    
//     makeChannelOverwrites(originalChannels, author);

//     removeChannelOverwrites(originalChannels, author, member, adminRoles, timeOut);

    
//   }
//   else {
//     // non-admin block works as intended
//     makeChannelOverwrites(originalChannels, author);
//     removeChannelOverwrites(originalChannels, author, member, [], timeOut);
//   }
// };

module.exports = { makeChannelOverwrites, removeChannelOverwrites };
