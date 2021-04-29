// changes the user's nickname depending on status

const { botReplies } = require('../data/shameReplies');
const { isUserOwner } = require('../utils/updateRoles');

function changeNickname(message, user){
  if(isUserOwner(message)) {
    message.reply(botReplies.changeOwnerNickname());
    return;
  }

  if(hasNickname(user)){
    // const shortname = user.nickname;
    let abbreviatedNickname = user.nickname;
    if(abbreviatedNickname.length > 20){
      abbreviatedNickname = abbreviatedNickname.split('').splice(0, 20).join('');
    }
    message.member.setNickname(`${abbreviatedNickname} || FOCUSED`);
    return;
  } 
  message.member.setNickname(`${user.username} || FOCUSED`);
}

function restoreNickname(user, member){
  member.setNickname(user.nickname);
}

function hasNickname(user){
  if(!user.nickname){
    user.nickname = '';
    return false;
  }
  return true;
}

module.exports = {
  changeNickname,
  hasNickname,
  restoreNickname,
};


