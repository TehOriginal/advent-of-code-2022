import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput.split('\n')

const alphabet = '*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return _.sum(input

  .map(input => [input.substr(0, input.length/2).split(''), input.substr(input.length/2, input.length).split('')])

  .map(input => _.intersection(input[0], input[1]))

  .flatMap(i => i)

  .map(input => _.indexOf(alphabet, input)))
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return _.sum(
    _.chunk(input, 3)
    .map(input => _.intersection(input[0].split(''), _.intersection(input[1].split(''), input[2].split(''))))
    .flatMap(e => e)
    .map(input => _.indexOf(alphabet, input)))
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
