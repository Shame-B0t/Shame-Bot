const { botReplies } = require('../data/shameReplies');

const deleteChannel = channel => {
  channel.delete()
    .then(result => console.log(`Channel ${result.id} - ${result.name} DELETED`))
    .catch(console.error);
};

/*
makes a new channel with the format 'username-focus'
sets permission overwrites on the new channel so that only the triggering author and the bot can view it
sends an @ mention to the triggering user from the new channel after it is instantiated
*/

const makeNewPrivateChannel = (client, message, userObj) => {
  const { guild, author } = message;
  const { channels } = guild;
  
  channels.create(`${ author.username }-focus`, {
    type: 'text',
    permissionOverwrites: [{
      id: guild.id,
      deny: ['VIEW_CHANNEL']
    },
    {
      id: author.id,
      allow: ['VIEW_CHANNEL']
    },
    {
      id: client.user.id,
      allow: ['VIEW_CHANNEL']
    }]
  })
    .then(newChannel => {
      newChannel.send(botReplies.welcomeToChannel(author.id));
      userObj.newChannel = newChannel;
    })
    .catch(console.error);
};

module.exports = {
  makeNewPrivateChannel,
  deleteChannel	
};
