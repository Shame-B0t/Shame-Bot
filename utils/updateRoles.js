// strip off and reattach the user's roles

const { createRole, deleteRole } = require('./newRole');

const getUserRoles = ({ member }) => member.roles.cache.filter(role => role.name !== '@everyone');

const isUserOwner = ({ member, guild }) => {
  return member === guild.owner ? true : false;
};

const stripUserRoles = async ({ member }, userRoles) => {
  await Promise.all(userRoles.map(role => member.roles.remove(role)));
};

const assignNewRole = ({ member }, role) => {
  return member.roles.add(role);
};

const restoreUserRoles = async ({ member }, userRoles) => {
  await Promise.all(userRoles.map(role => member.roles.add(role)));
};

// this is a test of the role update flow, currently running into permissions issues due to the hierarchy of roles (where the bot has needed permissions but has a low role in the hierarchy)
const testRoleUpdates = async (message, client) => {
  if(isUserOwner(message)) {
    message.reply('Sorry, you can\'t do this.');
    return;
  }
  
  // store user roles
  const userRoles = getUserRoles(message);

  // strip user roles
  await stripUserRoles(message, userRoles);

  // create new role with no permissions and assign it to user
  createRole(message, 'TEST ROLE')
    .then(newRole => {
      assignNewRole(message, newRole);
	
      // timeout for sake of self-destruct while testing
      client.setTimeout(async () => {
        await deleteRole(message, newRole);
        await restoreUserRoles(message, userRoles);
      }, 5000);
    });
};

module.exports = {
  getUserRoles,
  isUserOwner,
  stripUserRoles,
  assignNewRole,
  restoreUserRoles,
  testRoleUpdates
};
