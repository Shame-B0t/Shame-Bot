const { parseTime, timeToMs, msToString } = require('../utils/parseTime');
const { randomArrayIndex } = require('../utils/publiclyShame');

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
    const stringTime1 = '1 minute, 0 seconds';
    const stringTime2 = '1 hour, 0 minutes, 2 seconds';
    const stringTime3 = '1 hour, 15 minutes, 0 seconds';
    const stringTime4 = '10 hours, 1 minute, 0 seconds';
    
    expect(msToString(60000)).toEqual(stringTime1);
    expect(msToString(3603000)).toEqual(stringTime2);
    expect(msToString(4500000)).toEqual(stringTime3);
    expect(msToString(36061000)).toEqual(stringTime4);
  });

  it('loops through shameRepliesArray and gets a random response', () => {
    const shameArray = ['A', 'B', 'C'];
    let A = 0;
    let B = 0;
    let C = 0;
    
    for(let i = 0; i < 100; i++) {
      const response = randomArrayIndex(shameArray);

      if(shameArray[response] === 'A') A++;
      else if(shameArray[response] === 'B') B++;
      else if(shameArray[response] === 'C') C++;

      if(A > 0 && B > 0 && C > 0) break;
    }

    expect(A > 0 && B > 0 && C > 0).toEqual(true);
    // to test how many times loop runs before each is hit:
    // expect(A + B + C).toEqual('');
  });   
  // create small response array and loop through func a set amount or times OR until each response gets hit at least 5 times?

  it('mutates array in place while maintaining integrity of loop indices', () => {
    const arr = [1, 3, 3, 4, 5, 5, 7, 8, 9, 9];
    for(let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if(num % 2 === 0){
        arr.splice(i, 1);
        i--;
      }
    }
    expect(arr).toEqual([1, 3, 3, 5, 5, 7, 9, 9]);
  });

  it('mutates array in place while maintaining integrity of loop indices', () => {
    const arr = [2, 2, 4, 4, 5, 5, 6, 8, 8, 9];
    for(let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if(num % 2 === 0){
        arr.splice(i, 1);
        i--;
      }
    }
    expect(arr).toEqual([5, 5, 9]);
  });
  it('mutates array in place while maintaining integrity of loop indices', () => {
    const arr = [2, 2, 4, 4, 6, 4, 6, 8, 8, 10];
    for(let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if(num % 2 === 0){
        arr.splice(i, 1);
        i--;
      }
    }
    expect(arr).toEqual([]);
  });
  it('mutates array in place while maintaining integrity of loop indices', () => {
    const arr = [1, 3, 3, 5, 5, 5, 7, 8, 9, 9];
    for(let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if(num % 2 === 0){
        arr.splice(i, 1);
        i--;
      }
    }
    expect(arr).toEqual([1, 3, 3, 5, 5, 5, 7, 9, 9]);
  });
  it('mutates array in place while maintaining integrity of loop indices', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for(let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if(num % 2 === 0){
        arr.splice(i, 1);
        i--;
      }
    }
    expect(arr).toEqual([1, 3, 5, 7, 9]);
  });
});
