const { parseTime, timeToMs, msToHumanTime } = require('../utils/parseTime');

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
    const stringTime1 = '5 minutes';
    const stringTime2 = '15 minutes';
    const stringTime3 = '1 hour, 5 minutes';
    const stringTime4 = '10 hours, 15 minutes';
    
    expect(msToHumanTime(300000)).toEqual(stringTime1);
    expect(msToHumanTime(900000)).toEqual(stringTime2);
    expect(msToHumanTime(3900000)).toEqual(stringTime3);
    expect(msToHumanTime(36900000)).toEqual(stringTime4);
  });

});
