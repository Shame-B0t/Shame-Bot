// used with the stop command, interrupts a timeout and ends the altered user state

const { botReplies } = require('../data/shameReplies');

const wordCount = 50;

function presentChallenge(message, userId){

  message.reply(botReplies.serveChallenge(userId, wordCount));
}

function checkChallenge(message, user){
  const challengeSubmission = message.content.split(' ').slice(1);
  if(challengeSubmission.length >= wordCount){
    message.reply(botReplies.challengeCompleted());
    user.isActive = false;
  }
  if(challengeSubmission.length < wordCount){
    message.reply(botReplies.challengeIncomplete(challengeSubmission, wordCount));
  }
}

module.exports = {
  presentChallenge,
  checkChallenge,
};
