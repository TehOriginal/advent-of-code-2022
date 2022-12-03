import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return input
    .split('\n\n')
    .map(input => input.split('\n').map(input => parseInt(input)).reduce((prev, cur) => cur = cur + prev, 0)).sort((a, b) => b - a)[0]
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  return input
  .split('\n\n')
  .map(input => input
                      .split('\n')
                      .map(input => parseInt(input))
                      .reduce((prev, cur) => cur = cur + prev, 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((prev, cur) => cur = cur + prev, 0)
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
