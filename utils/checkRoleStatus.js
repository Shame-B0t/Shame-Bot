const isBotRoleHigher = (message) => {
  const { member } = message;
  return member.manageable;
};

module.exports = { isBotRoleHigher };
