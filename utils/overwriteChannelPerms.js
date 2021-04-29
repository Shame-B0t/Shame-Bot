const makeChannelOverwrites = async (message, userObj) => {
  const { author, member } = message;
  const { adminRoles } = userObj;
  
  adminRoles.forEach(role => member.roles.remove(role));

  await userObj.guildChannels.forEach(channel => {
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
      if(adminRoles) adminRoles.forEach(role => member.roles.add(role));
    }
    catch(error) {
      console.log(`No delete of overwrites in ${channel.name}`);
    }
  });
};

module.exports = { makeChannelOverwrites, removeChannelOverwrites };
