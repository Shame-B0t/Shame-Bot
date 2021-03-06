// changes the user's nickname depending on status

const { botReplies } = require('../data/shameReplies');
const { isUserOwner } = require('./checkOwner');

async function changeNickname(message, user){
  if(isUserOwner(message)) {
    message.reply(botReplies.changeOwnerNickname());
    return;
  }

  if(hasNickname(user)){
    let abbreviatedNickname = user.nickname;
    if(abbreviatedNickname.length > 20){
      abbreviatedNickname = abbreviatedNickname.split('').splice(0, 20).join('');
    }
    await message.member.setNickname(`${abbreviatedNickname} || FOCUSED`);
    return;
  } 
  await message.member.setNickname(`${user.username} || FOCUSED`);
}

async function restoreNickname(user, member){
  await member.setNickname(user.nickname);
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


