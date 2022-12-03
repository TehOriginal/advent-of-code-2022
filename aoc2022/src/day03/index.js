import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return _.sum(input.split('\n')
  .map(input => [input.substr(0, input.length/2), input.substr(input.length/2, input.length)])
  .map(input => [ input[0].split(''), input[1].split('') ] )
  .map(input => _.intersection(input[0], input[1]))
  .flatMap(i => i)
  .map(input => _.indexOf(alphabet, input)+1))
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
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
