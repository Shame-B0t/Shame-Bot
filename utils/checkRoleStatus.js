const isBotRoleHigher = ({ member }) => {
  return member.manageable;
};

module.exports = { isBotRoleHigher };
