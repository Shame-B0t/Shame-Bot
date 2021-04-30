/*
looks at the array of admin roles, if any, stores on the user object
iterates through those admin roles and removes each before making permission overwrites

looks at the array of original channels stored on the user object
iterates through those channels and creates a permission overwrite on each to block the user from viewing it
*/

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

/*
looks at the array of original channels stored on the user object
iterates through those channels and removes overwrites for the target user

if there are admin roles stored on the user object, it restores those roles to the user
*/

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
