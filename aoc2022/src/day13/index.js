import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput.split('\n\n').map(i=>i.split('\n').map(e=>JSON.parse(e)))

const compare = (a, b) => {
  if(typeof a == 'number' && typeof b == 'number') {
    console.log("NUMBER CHECK")
    console.log(a)
    console.log(b)
    console.log("--------------------")
    if(a < b) {
      console.log("NUMBER CHECK RETURNS PASS")
      return 'pass'
    } 
    if(a == b) {
      console.log("NUMBER CHECK RETURNS CONTINUE")
      return 'continue'
    }
    else {
      console.log("NUMBER CHECK RETURNS FAIL")
      return 'fail'
    }
  }
  if(Array.isArray(a) && Array.isArray(b)) {
    console.log("ARRAY CHECK")
    console.log(a)
    console.log(b)
    console.log("--------------------")
    let rightOrder = 'continue'
    if(a.length == 0 && b.length != 0) {
      console.log("ARRAY CHECK RETURNS PASS")
      return 'pass'
    }
    let count = 0;
    for(var i = 0; i < a.length; i++) {
      console.log("A:")
      console.log(a)
      console.log("ITERATIONS: " + i)
      if(!(rightOrder == 'continue')) {
        console.log("ARRAY CHECK STOPS WITH " + rightOrder)
        return rightOrder
      }
      if(b?.[i] == undefined) {
        console.log("ARRAY CHECK RETURNS UNDEFINED WITH " + rightOrder)
        return 'fail'
      }
      rightOrder = compare(a[i], b[i])
      count++
      if(b?.[i+1] != undefined && a?.[i+1] == undefined) {
        return 'pass'
      }
    }
    
    console.log("ARRAY CHECK FINISHES AND RETURNS " + rightOrder)
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
  // const input = parseInput2(rawInput)
  // input.push([[2]])
  // input.push([[6]])
  // const dividers = []
  // let sortedInput = input.sort((a, b) => {
  //   let comparison = compare(a, b)
  //   if(comparison == 'pass' || comparison == 'continue') {
  //     return -1
  //   }
  //   if(a === b) {
  //     return 0
  //   }
  //   return 1
  // })

  // return sortedInput.reduce((prev, cur, index) => prev = (JSON.stringify(cur) === '[[2]]' || JSON.stringify(cur) === '[[6]]') ? prev * (index+1) : prev, 1)
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
