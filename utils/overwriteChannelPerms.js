const overwriteChannelPerms = async ({ guild, author }) => {
  const { channels } = guild;
  const originalChannels = channels.cache;
 
  originalChannels.forEach(channel => {
    channel.createOverwrite(author.id, {
      'VIEW_CHANNEL': false
    })
      .catch(() => {
        console.log(`No overwrite performed in ${channel.name}`);
      });
  }); 
  
  // removing overwrites after a timeout for sake of testing/illustration
  setTimeout(() => {
    originalChannels.forEach(channel => {
      try {
        channel.permissionOverwrites.get(author.id).delete();
      }
      catch(error) {
        console.log(`No delete of overwrites performed in ${channel.name}`);
      }
    });
  }, 5000);
};

module.exports = { overwriteChannelPerms };
