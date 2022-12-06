import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput.split('')

const getValue = (input, size) => {
  let stack = [];
  for(let i = 0; i < input.length; i++) {
    stack.push(input[i])
    if(stack.length == size && stack.join('') === _.uniq(stack).join('')) {
      return i+1
    }
    if(stack.length == size) {
      stack = _.tail(stack)
    }
  }
  return 0;
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return getValue(input, 4)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return getValue(input, 14)
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
