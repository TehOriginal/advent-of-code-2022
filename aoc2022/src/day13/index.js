import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput.split('\n\n').map(i=>i.split('\n').map(e=>eval(e)))

const compare = (a, b) => {
  if(typeof a == 'number' && typeof b == 'number') {
    if(a < b) {
      return 'pass'
    } 
    if(a == b) {
      return 'continue'
    }
    else {
      return 'fail'
    }
  }
  if(Array.isArray(a) && Array.isArray(b)) {
    let rightOrder = 'continue'
    if(a.length == 0 && b.length != 0) {
      return 'pass'
    }
    for(let i = 0; i < a.length; i++) {
      if(!(rightOrder == 'continue')) {
        return rightOrder
      }
      if(b?.[i] == undefined) {
        return 'fail'
      }
      rightOrder = compare(a[i], b[i])
    }
    return rightOrder
  }
  if(typeof a == 'number' && Array.isArray(b)) {
    return compare([a], b)
  }
  if(typeof b == 'number' && Array.isArray(a)) {
    return compare(a, [b])
  }
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const rightOrder = []
  input.forEach((pair, index) => {
    let comparison = compare(pair[0], pair[1])
    if(comparison == 'pass' || comparison == 'continue') {
      rightOrder.push(index+1)
    }
  })

  return _.sum(rightOrder)
}

const parseInput2 = (rawInput) => rawInput.split('\n\n').map(i=>i.split('\n')).flatMap(i=>i).map(i=>eval(i))

const part2 = (rawInput) => {
  const input = parseInput2(rawInput)
  input.push([[2]])
  input.push([[6]])
  const dividers = []
  let sortedInput = input.sort((a, b) => {
    let comparison = compare(a, b)
    if(comparison == 'pass' || comparison == 'continue') {
      return -1
    }
    if(a === b) {
      return 0
    }
    return 1
  })

  return sortedInput.reduce((prev, cur, index) => prev = (JSON.stringify(cur) === '[[2]]' || JSON.stringify(cur) === '[[6]]') ? prev * (index+1) : prev, 1)
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
