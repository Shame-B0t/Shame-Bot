function parseTime(stringTime){
  const hrs = Number(stringTime.split(':')[0]);
  const mins = Number(stringTime.split(':')[1]);
  const parsedTime = timeToMs(hrs, mins);

  return parsedTime;
}

function timeToMs(hrs, mins){
  const hrToMs = hrs * 60 * 60 * 1000;
  const minToMs = mins * 60 * 1000;

  return hrToMs + minToMs;
}

function pluralize(number, unitOfTime) {
  if(number === 1) return `${number} ${unitOfTime}`;
  else return `${number} ${unitOfTime}s`;
}

// convert into minutes/hours "HH hour(s), MM minutes" 
function msToString(timeInMs) {
  const timeInHours = timeInMs / 1000 / 60 / 60; 
  const roundedHours = Math.floor(timeInHours); 
  const finalHours = pluralize(roundedHours, 'hour'); 

  const timeInMins = (timeInHours - roundedHours) * 60; 
  const roundedMins = Math.floor(timeInMins);
  const finalMins = pluralize(roundedMins, 'minute');

  const timeInSeconds = (timeInMins - roundedMins) * 60;
  const roundedSeconds = Math.floor(timeInSeconds);
  const finalSeconds = pluralize(roundedSeconds, 'second');

  if(roundedHours > 0) {
    return `${finalHours}, ${finalMins}, ${finalSeconds}`;
  }
  else if(roundedHours === 0 && roundedMins > 0) {
    return `${finalMins}, ${finalSeconds}`;
  }
  else if(roundedMins === 0) {
    return `${finalSeconds}`;
  }
}

function remainingTime(endTime) {
  const now = Date.now();
  const difference = endTime - now;

  return difference;
}

module.exports = {
  parseTime,
  timeToMs,
  msToString,
  pluralize,
  remainingTime
};
