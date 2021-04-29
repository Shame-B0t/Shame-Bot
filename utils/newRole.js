// create a role that will be assigned to a user

const createRole = (message, roleName) => {
  const { guild } = message;
  const rolesCount = guild.roles.cache.size;
  const topOfRolesList = rolesCount - 1;

  return guild.roles.create({
    data: {
      name: roleName,
      position: topOfRolesList,
      permissions: []
    }
  });
};

const deleteRole = (message, role) => {
  const { guild } = message;
  guild.roles.cache.find(guildRole => guildRole.id === role.id).delete();
};

module.exports = {
  createRole,
  deleteRole
};
