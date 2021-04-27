// changes the user's nickname depending on status

function changeNickname(message){
  message.member.setNickname('::dunce hat::');
}

module.exports = {
  changeNickname,
};
