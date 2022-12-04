import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput.split('\n')

const isBetween = (num, min, max) => {
  return num >= min && num <= max
}

const checkIfIsIn = (pair) => {
  if((isBetween(pair[0][0], pair[1][0], pair[1][1]) && isBetween(pair[0][1], pair[1][0], pair[1][1]))
  || 
  (isBetween(pair[1][0], pair[0][0], pair[0][1]) && isBetween(pair[1][1], pair[0][0], pair[0][1]))) {
    return 1;
  } else {
    return 0
  }
}

const checkIfIsIn2 = (pair) => {
  if((isBetween(pair[0][0], pair[1][0], pair[1][1]) || isBetween(pair[0][1], pair[1][0], pair[1][1]))
  || 
  (isBetween(pair[1][0], pair[0][0], pair[0][1]) || isBetween(pair[1][1], pair[0][0], pair[0][1]))) {
    return 1;
  } else {
    return 0
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return _.sum(input.map(input => input.split(',').map(e => e.split('-').map(j => parseInt(j)))).map(i => checkIfIsIn(i)))
  
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return _.sum(input.map(input => input.split(',').map(e => e.split('-').map(j => parseInt(j)))).map(i => checkIfIsIn2(i)))
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
