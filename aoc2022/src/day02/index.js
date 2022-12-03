import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const pointsFromSign = (sign) => {
  switch(sign) {
    case 'X':
      return 1
    case 'Y':
      return 2
    case 'Z':
      return 3
  }
} 

const pointsFromOutcome = (me, opp) => {
  switch(me.charCodeAt(0) - opp.charCodeAt(0)) {
    case 21:
    case 24:
      return 6
    case 23:
      return 3
    default:
      return 0
  }
}

const mapMoves = () => {
  return {
    A: {
      Z: 'Y',
      X: 'Z',
      Y: 'X',
    },
    B: {
      Z: 'Z',
      X: 'X',
      Y: 'Y',
    },
    C: {
      Z: 'X',
      X: 'Y',
      Y: 'Z',
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return input.split('\n').map(input => input.split(' '))  
  .map(input => {
    return pointsFromSign(input[1]) + pointsFromOutcome(input[1], input[0])
  })
  .reduce((prev, cur) => prev = prev + cur, 0)
  
  
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return input.split('\n').map(input => input.split(' '))  
  .map(input => {
    return [input[0], mapMoves()[input[0]][input[1]]]
  }).map(input => {
    return pointsFromSign(input[1]) + pointsFromOutcome(input[1], input[0])
  })
  .reduce((prev, cur) => prev = prev + cur, 0)
  
  
  
  
  

  
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
