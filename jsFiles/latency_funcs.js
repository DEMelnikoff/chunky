/* 

function for creating n-dimensional latency array given p(hit)

*/

const makeRT = function(n, p) {

  const nDraws = Math.floor(n * p)  // set number of draws from geometric distribution
  const maxWinStrk = 3;             // set length of longest win streak at the trial level
  const maxLossStrk = 2;            // set length of longest losing streak at chunk level
  let geoms = [];                   // random draws from geometric distribution
  let rt = [];                      // array of RTs
  let nTrials = 0;                  // count total numeber of trials
  let winStrkPass = true;           // flag for passing the max win streak condition
  let lossStrkPass = true;          // flag for passing the max loss streak condition
  let nLossTot = 0;                 // count total numeber of losses

  /* 

  Create random vector of n trial outcomes with following conditions:
    - total number of trial-level losses = 1 - nDraws
    - total number of trials = n
    - first and last trials are losses
    - max win streak at the trial level is <= maxWinStrk
    - max loss streak at the chunk level is <= maxLossStrk

  */

  do {
    geoms = [];
    winStrkPass = true;
    lossStrkPass = true;

    // make n * p random draws from geometric distribution
    for (let i = 0; i < nDraws; i++) {
      let probDraw = (Math.random() * .998) + .001;
      let geomDraw = Math.floor(Math.log(1 - probDraw) / Math.log(1 - p));
      geoms.push(geomDraw);
    }

    // get longest losing streak at the chunk level
    let nLoss = geoms.map(x => Math.floor(x/5));  // number of chunk-level losses in a row per geom draw
    if (Math.max(...nLoss) > maxLossStrk) { lossStrkPass = false };

    // get longest winning streak at the trial level
    for (let i = maxWinStrk; i <= nDraws; i++) {
      let geomSlice = geoms.slice(i - maxWinStrk, i);
      if (geomSlice.every(x => x == 0)) { winStrkPass = false };
    };

    nTrials = geoms.reduce((x, y) => x + y, 0) + geoms.length;  // compute total number of trials
    nLossTot = geoms.reduce((x, y) => x + y, 0);  // get total number of losses

  } while (nTrials !== n || !winStrkPass || !lossStrkPass || nLossTot !== (n - nDraws) || geoms[0] == 0);


  for (let i = 0; i < geoms.length; i++) {
    rt.push(...Array(geoms[i]).fill(200));
    rt.push(750);
  }

  console.log(geoms, nTrials, nLossTot);

  return rt;
}

/*
// function for creating latency array in easy condition (p(hit) = .5)
const easyArray = function() {

  let geomArray = [];       // array of random draws from geometric distribution
  let totalTrials = 0;      // total number of game trials given geomArray
  let maxLosingStreak = 5;  // length of longest losing streak given geomArray
  let winStreakPass = true; // length of longest winning streak given geomArray
  let rtArray = [];         // array of RTs
  let nDraws = Math.floor(n * .5)  // set number of draws from geometric distribution

  // create random vector of 50 trial outcomes with 6 wins, 6 losses, and no losing streak > 2
  do {
    geomArray = [];
    totalTrials = 0;   
    maxLosingStreak = 5;
    winStreakPass = true;


    // make 6 random draws from geometric distribution
    for (let i = 0; i < nDraws; i++) {
      let probDraw = (Math.random() * .998) + .001;
      let geomDraw = Math.floor(Math.log(1 - probDraw) / Math.log(1 - .5));
      geomArray.push(geomDraw);
    }

    for (let i = 4; i < nDraws; i++) {
      let geomSlice = geomArray.slice(i-4, i);
      if (geomSlice.every(x => x == 0)) {
        winStreakPass = false;
      }
    }

    maxLosingStreak = Math.max(...geomArray);

    // count total number of trials given geom array
    for (let i = 0; i < geomArray.length; i++) {
      totalTrials += geomArray[i] + 1;
    }

  } while (totalTrials !== nDraws || maxLosingStreak > 4 || !winStreakPass || geomArray[0] == 0);

  for (let i = 0; i < geomArray.length; i++) {
    rtArray.push(...Array(geomArray[i]).fill(225));
    rtArray.push(750);
  }

  return rtArray;
}


*/
