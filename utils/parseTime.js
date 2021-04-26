// takes user time input and parses it to milliseconds

// ideally, enforcing a 00:00 format might be the most consistently parseable

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

function msToString(timeInMs) {
  // convert into minutes/hours "HH hour(s), MM minutes" example: 4500000 ms
  const timeInHours = timeInMs / 1000 / 60 / 60; // 1.25h
  const roundedHours = Math.floor(timeInHours); // 1hr
  const finalHours = pluralize(roundedHours, 'hour'); // '1 hour'

  const timeInMins = (timeInHours - roundedHours) * 60; //15min
  const roundedMins = Math.floor(timeInMins);
  const finalMins = pluralize(roundedMins, 'minute');

  if(finalHours === '0 hours') {
    return finalMins;
  } else if(finalMins === '0 minutes') {
    return finalHours;
  } return `${finalHours}, ${finalMins}`;
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
