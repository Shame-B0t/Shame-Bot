const { botReplies } = require('../data/shameReplies');

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
      deny: ['VIEW_CHANNEL'] // blocks other users from seeing the channel
    },
    {
      id: author.id,
      allow: ['VIEW_CHANNEL'] // allows the target user to see the channel
    },
    {
      id: client.user.id,
      allow: ['VIEW_CHANNEL'] // allows the bot to see the channel
    }]
  })
    .then(newChannel => {
      newChannel.send(botReplies.welcomeToChannel(author.id));
      userObj.newChannel = newChannel; // saves the newly created channel onto the user object held in state
    })
    .catch(console.error);
};

// general channel deletion utility
const deleteChannel = channel => {
  channel.delete()
    .then(result => console.log(`Channel ${result.id} - ${result.name} DELETED`))
    .catch(console.error);
};

module.exports = {
  makeNewPrivateChannel,
  deleteChannel	
};
