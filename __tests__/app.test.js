const { parseTime, timeToMs, msToString } = require('../utils/parseTime');

describe('tests utility functions', () => {
  it('converts a string formatted as 00:00 into milliseconds', () => {
    const stringTime1 = '00:05';
    const stringTime2 = '00:15';
    const stringTime3 = '01:05';
    const stringTime4 = '10:15';
    
    expect(parseTime(stringTime1)).toEqual(300000);
    expect(parseTime(stringTime2)).toEqual(900000);
    expect(parseTime(stringTime3)).toEqual(3900000);
    expect(parseTime(stringTime4)).toEqual(36900000);
  });

  it('converts a hours and minutes into milliseconds', () => {
    const hr = 2;
    const min = 15;
    const hr2 = 0;
    const min2 = 0;
    const min3 = 1;

    expect(timeToMs(hr, min)).toEqual(8100000);
    expect(timeToMs(hr, min2)).toEqual(7200000);
    expect(timeToMs(hr2, min)).toEqual(900000);
    expect(timeToMs(hr2, min2)).toEqual(0);
    expect(timeToMs(hr2, min3)).toEqual(60000);
  });

  it('converts milliseconds into a string formatted as 00 hours 00 minutes', () => {
    const stringTime1 = '1 minute';
    const stringTime2 = '1 hour';
    const stringTime3 = '1 hour, 15 minutes';
    const stringTime4 = '10 hours, 1 minute';
    
    expect(msToString(60000)).toEqual(stringTime1);
    expect(msToString(3600000)).toEqual(stringTime2);
    expect(msToString(4500000)).toEqual(stringTime3);
    expect(msToString(36060000)).toEqual(stringTime4);
  });

  it('loops through responses', () => {

  });   


  // create small response array and loop through func a set amount or times OR until each response gets hit at least 5 times?
});
