const deleteChannel = channel => {
  channel.delete()
    .then(result => console.log(`Channel ${result.id} - ${result.name} DELETED`))
    .catch(console.error);
};

/*
makes a new channel with the format 'username-focus'
takes in the client and a message object - makeNewPrivateChannel(client, message)
sets permission overwrites on the new channel so that only the triggering author and the bot can view it (and, by extension, send messages in it)
sends an @ mention to the triggering user from the new channel after it is instantiated

for test/illustration purposes, deleteChannel is being used here after a ten second timeout
*/

const makeNewPrivateChannel = (client, { guild, author }, timeout) => {
  const { channels } = guild;
  
  // maybe add in a react here on the original message that indicates it's been heard? in case the user misses the mention from the new channel? A lil ear emoji? Some studious person? A speech bubble? A telephone?

  // TODO add role permission for the newly created role, possibly
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
      newChannel.send(`Welcome, <@${author.id}>`);
      setTimeout(() => deleteChannel(newChannel), timeout);
    })
    .catch(console.error);
};

module.exports = {
  makeNewPrivateChannel,
  deleteChannel	
};
