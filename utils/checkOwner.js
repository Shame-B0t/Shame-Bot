const isUserOwner = (message) => {
  const { member, guild } = message;
  return member === guild.owner ? true : false;
};


module.exports = {
  isUserOwner,
};
