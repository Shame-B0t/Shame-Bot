const { msToString, remainingTime } = require('../utils/parseTime');

const shameRepliesArray = [
  'tsk tsk. Back to focus time!',
  'excuse me bruv, aren\'t you supposed to be focusing!?!',
  'Oy! Shouldn\'t you be focusin mate?',
  'according to my calculations, you are currently in focus mode and shouldn\'t be posting any comments!!',
  'you\'re posting comments when you SHOULD NOT BE',
  'back to work, buddy',
  '"always remember, your focus determines your reality" - Yoda ... so hup to it!!',
  'I\'m telling mum you\'re commenting where you shouldn\'t be!',
  'your focus game is NOT 💯',
  'time to get back to work, pal',
  'why aren\'t you focusing??',
];

const botReplies = {
  timerEnded(userId){
    return `<@${userId}> your focus time is up`;
  },

  alreadyInAMode(){
    return 'you are already in a focus mode, enter `--exit` to end your session';
  },

  invalidStatus(){
    return 'Enter a valid status: `shame`, `isolation`, or `lockdown` in this format: `--focus isolation 01:00`';
  },

  invalidTime(mode){
    return `Enter a valid time format (hh:mm) in your request ex. "--focus ${mode} 01:00"`;
  },

  userIsOwner(){
    return 'Sorry, server owners cannot use the bot in isolation or lockdown modes';
  },

  changeOwnerNickname(){
    return 'Sorry, Shame-b0t cannot change a server owner\'s nickname, but other functionality in shame mode should work as expected';
  },

  confirmShameMode(userObj){
    const timeLeft = remainingTime(userObj.endTime);
    const timeLeftString = msToString(timeLeft);
    return `You are now in ${userObj.mode} mode. You will be restricted for ${timeLeftString}`;
  },

  confirmOtherFocusMode(userObj){
    const timeLeft = remainingTime(userObj.endTime);
    const timeLeftString = msToString(timeLeft);
    return `You are now in ${userObj.mode} mode. You will be restricted for ${timeLeftString}. Go into your new private focus channel to enter any commands.`;
  },

  timeCheck(user){
    const timeLeft = remainingTime(user.endTime);
    const timeLeftString = msToString(timeLeft);
    return `You have ${timeLeftString} left.`;
  },

  autoReplyToSender(user, remainingTime){
    return `Sorry, ${user.nickname || user.username} is in focus mode currently. Their focus time ends in ${remainingTime}`;
  },

  timerEndedEarly(){
    return 'you ended your focus time early, you have been returned to normal';
  },

  welcomeToChannel(authorId){
    return `Welcome, <@${authorId}>`;
  },

  serveChallenge(userId, challengeParam){
    return `Nice try <@${userId}>, you tried to end your focus mode, but to escape lockdown early you must first complete a challenge. Begin your response with --challenge and type a ${challengeParam} word essay on why staying focused is important for accomplishing your goals.`;
  },

  challengeCompleted(){
    return 'challenge completed, you have been returned to normal';
  },

  challengeIncomplete(response, challengeParam){
    return `Don't skimp! You've only typed ${response.length} out of the ${challengeParam} word requirement. Resubmit your answer using --challenge with ${challengeParam - response.length} more words`;
  },

  tooPowerful(){
    return 'Nope, sorry, you\'re too powerful for me. Try `shame` mode, or ask someone with administrative priveliges to move my role up in the hierarchy';
  },

  countdownTimer(){
    return 'you already have a countdown timer started';
  },

  noChallenge(){
    return 'you are not in a mode which requires a challenge before exiting. To end your session early enter command `--exit`';
  }
};

module.exports = {
  botReplies,
  shameRepliesArray
};
