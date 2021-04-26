// strip off and reattach the user's roles

const getUserRoles = ({ member }) => member.roles.cache.filter(role => role.name !== '@everyone');

const stripUserRoles = async ({ member }, userRoles) => {
  await Promise.all(userRoles.map(role => member.roles.remove(role)));
};

const assignNewRole = ({ member }, role) => {
  return member.roles.add(role);
};

const restoreUserRoles = async ({ member }, userRoles) => {
  await Promise.all(userRoles.map(role => member.roles.add(role)));
};

module.exports = {
  getUserRoles,
  stripUserRoles,
  assignNewRole,
  restoreUserRoles
};
