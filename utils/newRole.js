// create a role that will be assigned to a user

const createRole = ({ guild }, roleName) => {
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

const deleteRole = ({ guild }, role) => {
  guild.roles.cache.find(guildRole => guildRole.id === role.id).delete();
};

module.exports = {
  createRole,
  deleteRole
};
