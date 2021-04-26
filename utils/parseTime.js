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

function pluralMins(min) {
  if(min === 1) {
    return `${min} minute`;
  } else return `${min} minutes`;
}

function pluralHours(hour) {
  if(hour === 1) {
    return `${hour} hour`;
  } else return `${hour} hours`;
}

function msToString(timeInMs) {
  // convert into minutes/hours "HH hour(s), MM minutes" example: 4500000 ms
  const timeInHours = timeInMs / 1000 / 60 / 60; // 1.25h
  const roundedHours = Math.floor(timeInHours); // 1hr
  const finalHours = pluralHours(roundedHours); // '1 hour'

  const timeInMins = (timeInHours - roundedHours) * 60; //15min
  const roundedMins = Math.floor(timeInMins);
  const finalMins = pluralMins(roundedMins);

  if(finalHours === '0 hours') {
    return finalMins;
  } else if(finalMins === '0 minutes') {
    return finalHours;
  } return `${finalHours}, ${finalMins}`;
}

module.exports = {
  parseTime,
  timeToMs,
  msToString,
  pluralMins,
  pluralHours
};
