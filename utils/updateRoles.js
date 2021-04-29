// strip off and reattach the user's roles

const getUserRoles = (message) => {
  const { member } = message;
  member.roles.cache.filter(role => role.name !== '@everyone');
};


const isUserOwner = (message) => {
  const { member, guild } = message;
  return member === guild.owner ? true : false;
};

const stripUserRoles = async (message, userRoles) => {
  const { member } = message;
  await Promise.all(userRoles.map(role => member.roles.remove(role)));
};

const assignNewRole = (message, role) => {
  const { member } = message;
  return member.roles.add(role);
};

const restoreUserRoles = async (message, userRoles) => {
  const { member } = message;
  await Promise.all(userRoles.map(role => member.roles.add(role)));
};

module.exports = {
  getUserRoles,
  isUserOwner,
  stripUserRoles,
  assignNewRole,
  restoreUserRoles
};
