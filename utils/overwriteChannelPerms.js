const isUserAdmin = (member) => {
  return member.permissions.has('ADMINISTRATOR') ? true : false;
};

const makeChannelOverwrites = (channels, author) => {
  channels.forEach(channel => {
    channel.createOverwrite(author.id, {
      'VIEW_CHANNEL': false
    })
      .catch(() => {
        console.log(`No overwrite performed in ${channel.name}`);
      });
  });
};

const removeChannelOverwrites = (channels, author, member, adminRoles, timeout) => {
  setTimeout(() => {
    channels.forEach(channel => {
      try {
        channel.permissionOverwrites.get(author.id).delete();
        
        // admin check to see if roles should be restored, then restore roles
        if(adminRoles.length) adminRoles.forEach(role => member.roles.add(role));
      }
      catch(error) {
        console.log(`No delete of overwrites in ${channel.name}`);
      }
    });
  }, timeout);
};

const overwriteChannelPerms = ({ guild, author, member }) => {
  const { channels } = guild;
  const originalChannels = channels.cache;
  
  if(isUserAdmin(member)) {
    const adminRoles = [];
    
    member.roles.cache.forEach(role => {
      if(role.permissions.has('ADMINISTRATOR')) {
        adminRoles.push(role);
        member.roles.remove(role);
      }
    });
    
    makeChannelOverwrites(originalChannels, author);

    removeChannelOverwrites(originalChannels, author, member, adminRoles, 10000);

    
  }
  else {
    // non-admin block works as intended
    makeChannelOverwrites(originalChannels, author);
    removeChannelOverwrites(originalChannels, author, member, [], 10000);
  }
};

module.exports = { overwriteChannelPerms };
