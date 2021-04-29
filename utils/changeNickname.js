// changes the user's nickname depending on status

const { botReplies } = require('../data/shameReplies');
const { isUserOwner } = require('../utils/updateRoles');

function changeNickname(message, user){
  if(isUserOwner(message)) {
    message.reply(botReplies.changeOwnerNickname());
    return;
  }

  if(hasNickname(user)){
    const shortname = user.nickname;
    let abbreviatedNickname = user.nickname;
    if(shortname.length > 12){
      abbreviatedNickname = shortname.split('').splice(0, 11).join('');
    }
    message.member.setNickname(`${abbreviatedNickname} is in a focus mode`);
    return;
  } 
  message.member.setNickname(`${user.username} is in a focus mode`);

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


