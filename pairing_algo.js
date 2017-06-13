'use strict';

const Combinatorics = require('js-combinatorics');



//This is a combination generator to create all possible pairs
//of students provided a range of student ID's. This also concatenates
//an array of single student ID's to allow for students working alone. 

/**
 * This is a combination generator for pairs
 * @param  {Number[]} inputSet - the set of n elements
 * @param  {number} k - hardcoded to 2 here for selecting pairs
 * @return {Array.<Number[]>} returns an array of arrays of numbers, like [[1, 2], [2, 3], [3, 2]]
 */
function comboGenerator(inputSet, k=2) {
  return (function subsetRecurser(subset, inputSetIndex, subsetIndex, result) {
        // set up some defaults
    inputSetIndex = inputSetIndex || 0;
    subsetIndex = subsetIndex || 0;
    subset = subset || [];
    result = result || [];

        // if true, the current is done being built, so push it into `result`
    if (subsetIndex === k) {
            // the .slice() here returns a clone of the subset array
      result.push(subset.slice());
      return;
    }

        // stop once we've iterated through all of the `inputSet`
    if (inputSetIndex >= inputSet.length) {
      return;
    }

        // build the subset array
        // notice how we're just replacing previous values whenever we rebuild
    subset[subsetIndex] = inputSet[inputSetIndex];

        // recurse through each subset
    subsetRecurser(subset, inputSetIndex + 1, subsetIndex + 1, result);

        // recurse through each member of the inputSet
    subsetRecurser(subset, inputSetIndex + 1, subsetIndex, result);

        // return the pairs result concatenated with singles 
    return result.concat(inputSet.map(element => [element]));
  })();
}

// the simplest factorial function in the world...
function factorial(num) {
  if (num <= 1) {
    return 1;
  }

  return num * factorial(num - 1);
}

// something to test `comboGenerator()` results with
// this function uses the binomial coeffecient to figure out
// how many ways n things can be taken k at a time or
// n! / (k!(n-k)!) + n (for single groupings)
function comboCounter(n, k=2) {
  return factorial(n) / (factorial(k) * factorial(n - k)) + n;
}

// returns a random number
function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// returns a range of unique numbers, each between min and max, including min and max
function uniqueRangeGenerator(min, max) {
  const range = [];

  while (range.length < (max - min + 1)) {
    var randomNumber = randomNumberGenerator(min, max);

    if (range.indexOf(randomNumber) === -1) {
      range.push(randomNumber);
    }
  }
  return range;
}


function setsOfCombosGenerator(pairsArray, inputSet){
  const numPairs = Math.floor(inputSet.length/2);
  const setsOfPairs = Combinatorics.combination(pairsArray, numPairs);
  const currSet = setsOfPairs.toArray()[0];
  console.log();
  return 'work in progress';
}


/**
 * MOMENT OF TRUTH...
 */

const uniqueRange = uniqueRangeGenerator(0, 5);
const generatedPairs =comboGenerator(uniqueRange);
const expectedNumberOfPairs = comboCounter(uniqueRange.length);

const packageGenPairs = Combinatorics.combination(uniqueRange, 2).toArray();
const allPairs = packageGenPairs.concat(uniqueRange.map(element => [element]));
console.log(allPairs);

console.log('Here come all the sets!');
//const allTheThings = 
//setsOfCombosGenerator(allPairs, uniqueRange);
//console.log(allTheThings.toArray());

// console.log('Given a range of unique numbers like:');
// console.log(uniqueRange); // returns something like [ 7, 8, 6, 0, 4, 1, 5, 2, 3, 9 ]
// console.log('These are all the different possible pairs:');
// console.log(generatedPairs);


// console.log(`There should be ${generatedPairs.length} different possible pairs...`);

// if (expectedNumberOfPairs === generatedPairs.length) {
//   console.log('... and there are!!!!');
// } else {
//   console.log('... and there are NOT!!!!');
// }

