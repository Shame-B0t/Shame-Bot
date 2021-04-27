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

const removeChannelOverwrites = (channels, author, timeout) => {
  setTimeout(() => {
    channels.forEach(channel => {
      try {
        channel.permissionOverwrites.get(author.id).delete();
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

  // TODO restoring the admin roles seems to have async effects that need to be accounted for, probably by awaiting the overwrite functions (but all attempts so far have failed) - the view is not restricted if I close this out with the restoration of the admin role(s), but if I omit that line the role is stripped and the view is restricted as intended
  
  if(isUserAdmin(member)) {
    const adminRoles = [];
    
    member.roles.cache.forEach(role => {
      if(role.permissions.has('ADMINISTRATOR')) {
        adminRoles.push(role);
        member.roles.remove(role);
      }
    });
    
    makeChannelOverwrites(originalChannels, author);

    removeChannelOverwrites(originalChannels, author, 5000);

    // adminRoles.forEach(role => member.roles.add(role));
  }
  else {
    // non-admin block works as intended
    makeChannelOverwrites(originalChannels, author);
    removeChannelOverwrites(originalChannels, author, 5000);
  }
};

module.exports = { overwriteChannelPerms };
