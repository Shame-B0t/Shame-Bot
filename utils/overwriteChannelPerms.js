const overwriteChannelPerms = ({ guild, author }) => {
  const { channels } = guild;
  const originalChannels = channels.cache;
  
  originalChannels.forEach(channel => {
	  channel.createOverwrite(author.id, {
		  'VIEW_CHANNEL': false
	  })
	  .catch(() => {
		  console.log(`Bot lacks access to perform an overwrite in ${channel.name}`);
	  });
  });

  setTimeout(() => {
    originalChannels.forEach(channel => {
      channel.createOverwrite(author.id, {
        'VIEW_CHANNEL': true
      })
        .catch(() => {
          console.log(`Bot lacks access to perform an overwrite in ${channel.name}`);
        });
    });
  }, 5000);
};

module.exports = { overwriteChannelPerms };
