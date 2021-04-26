// used with the stop command, interrupts a timeout and ends the altered user state

const wordCount = 50;

function presentChallenge(message, userId){

  message.reply('you tried to end your timer early');
  message.reply(`Nice try <@${userId}>, to escape lockdown early you must first complete a challenge. Begin your reponse with --challenge and type a ${wordCount} word essay on why staying focused is important for accomplishing your goals.`);
}

function checkChallenge(message, user){
  const challengeSubmission = message.content.split(' ').slice(1);
  if(challengeSubmission.length >= wordCount){
    message.reply('challenge completed, your roles have been restored');
    user.isActive = false;
  }
  if(challengeSubmission.length < wordCount){
    message.reply(`You only typed ${challengeSubmission.length} out of the ${wordCount} word requirement. Resubmit your answer using --challenge with ${wordCount - challengeSubmission.length} more words`);
  }
}

module.exports = {
  presentChallenge,
  checkChallenge,
};
