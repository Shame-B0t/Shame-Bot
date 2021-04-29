<<<<<<< HEAD
=======
const { msToString } = require('../utils/parseTime');

>>>>>>> 30a9884c6d41cbb54b1bf2620a5a7b72624e3fa3
const shameRepliesArray = [
  'tsk tsk. Back to focus time!',
  'excuse me bruv, aren\'t you supposed to be focusing!?!',
  'Oy! Shouldn\'t you be focusin mate?',
  'according to my calculations, you are currently in focus mode and shouldn\'t be posting any comments!!',
<<<<<<< HEAD
  'is posting comments when they SHOULD NOT BE',
  'back to work, buddy',
  '"always remember, your focus determines your reality" - Yoda ... so hup to it!!',
  'I\'m telling mum you\'re commenting where you shouldn\'t be',
  '\'s focus game is NOT 💯',
  'time to get back to work, pal',
  'why aren\'t you focusing??'
=======
  'you\'re posting comments when you SHOULD NOT BE',
  'back to work, buddy',
  '"always remember, your focus determines your reality" - Yoda ... so hup to it!!',
  'I\'m telling mum you\'re commenting where you shouldn\'t be!',
  'your focus game is NOT 💯',
  'time to get back to work, pal',
  'why aren\'t you focusing??',
>>>>>>> 30a9884c6d41cbb54b1bf2620a5a7b72624e3fa3
];

const botReplies = {

  timerEnded(userId){
<<<<<<< HEAD
    return `<@${userId}> your timer is up`;
  },

  alreadyInAMode(){
    return 'you are already in a productivity mode, enter --exit to end your session';
=======
    return `<@${userId}> your focus time is up`;
  },

  alreadyInAMode(){
    return 'you are already in a focus mode, enter --exit to end your session';
>>>>>>> 30a9884c6d41cbb54b1bf2620a5a7b72624e3fa3
  },

  invalidStatus(){
    return 'Enter a valid status: shame, isolation, or lockdown in this format, ex. "--focus isolation 01:00"';
  },

  invalidTime(mode){
    return `enter a valid time format hh:mm in your request ex. "--focus ${mode} 01:00"`;
  },

  userIsOwner(){
<<<<<<< HEAD
    return 'Sorry, server owners cannot use the bot in isolation or lockdown modes.';
  },

  changeOwnerNickname(){
    return 'Sorry, Shame-b02 cannot change a server owner\'s nickname, but other functionality in shame mode should work as expected.';
  },

  createRoleString(){
    return 'test-user role';
  },

  confirmMode(mode){
    return `You are now in ${mode} mode.`;
  },

  confirmTime(time){
    return `you will be restricted for ${time / 60000} mins`;
  },

=======
    return 'Sorry, server owners cannot use the bot in isolation or lockdown modes';
  },

  changeOwnerNickname(){
    return 'Sorry, Shame-b02 cannot change a server owner\'s nickname, but other functionality in shame mode should work as expected';
  },


  // Update to show remaining time in hours/minutes/seconds where applicable
  confirmFocusMode(mode, time){
    const timeRemaining = msToString(time);
    return `You are now in ${mode} mode. You will be restricted for ${timeRemaining}`;
  },

  // Update to show remaining time in hours/minutes/seconds where applicable
>>>>>>> 30a9884c6d41cbb54b1bf2620a5a7b72624e3fa3
  autoReplyToSender(user, remainingTime){
    const nickname = user.nickname;
    if(nickname) {
      return `Sorry, ${nickname} is in focus mode currently. Their focus time ends in ${remainingTime}`;
    } else if(!nickname) {
      return `Sorry, ${user.username} is in focus mode currently. Their focus time ends in ${remainingTime}`;
    }
  },

  timerEndedEarly(){
<<<<<<< HEAD
    return 'you ended your timer early, your roles have been restored';
=======
    return 'you ended your focus time early, you have been returned to normal';
>>>>>>> 30a9884c6d41cbb54b1bf2620a5a7b72624e3fa3
  },

  welcomeToChannel(authorId){
    return `Welcome, <@${authorId}>`;
  },

  serveChallenge(userId, challengeParam){
<<<<<<< HEAD
    return `Nice try <@${userId}>, you tried to end your timer early but to escape lockdown early you must first complete a challenge. Begin your reponse with --challenge and type a ${challengeParam} word essay on why staying focused is important for accomplishing your goals.`;
  },

  challengeCompleted(){
    return 'challenge completed, your roles have been restored';
  },

  challengeIncomplete(response, challengeParam){
    return `You only typed ${response.length} out of the ${challengeParam} word requirement. Resubmit your answer using --challenge with ${challengeParam - response.length} more words`;
  },

  tooPowerful(){
    return 'Nope, sorry, you\'re too powerful for me. Try `shame` mode, or ask someone with administrative priveliges to move my role up in the hierarchy';
=======
    return `Nice try <@${userId}>, you tried to end your focus mode but to escape lockdown mode early you must first complete a challenge. Begin your response with --challenge and type a ${challengeParam} word essay on why staying focused is important for accomplishing your goals.`;
  },

  challengeCompleted(){
    return 'challenge completed, you have been returned to normal';
  },

  challengeIncomplete(response, challengeParam){
    return `Don't skimp! You've only typed ${response.length} out of the ${challengeParam} word requirement. Resubmit your answer using --challenge with ${challengeParam - response.length} more words`;
  },

  tooPowerful(){
    return 'Nope, sorry, you\'re too powerful for me. Try `shame` mode, or ask someone with administrative privileges to move my role up in the hierarchy';
>>>>>>> 30a9884c6d41cbb54b1bf2620a5a7b72624e3fa3
  }
};

module.exports = {
  botReplies,
  shameRepliesArray
};
