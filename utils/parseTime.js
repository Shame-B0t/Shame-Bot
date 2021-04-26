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

function calculateEndTime() {
  // get milliseconds timestamp for NOW and endtime
  // convert into minutes/hours "HH hour(s), MM minutes"
  // If statement for hour vs hours and minute vs minutes (stretch?)
  // return difference
}

module.exports = {
  parseTime,
  timeToMs,
  calculateEndTime,
};
