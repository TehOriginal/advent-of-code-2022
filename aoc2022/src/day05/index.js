import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => {
  return { 
    firstInput: rawInput.split('\n\n')[0].split('\n'),
    secondInput: rawInput.split('\n\n')[1].split('\n').map(input => input.split(' ').filter(Number).map(e => parseInt(e)))
  }
  
}
const part1 = (rawInput) => {
  const { firstInput, secondInput } = parseInput(rawInput)
  const col = parseInt(firstInput[firstInput.length-1].charAt(firstInput[firstInput.length-1].length-2))
  const values = Array.from(new Array(col), element => []);

  for(let j = 0; j < col; j++) {
    for(let i = 0; i < firstInput.length-1; i++) {
      const temp = firstInput[i]
      const tempValue = temp.slice(4*j+1, 4*j+2)
      if(tempValue != ' ') {
        values[j].push(tempValue)
      }
      
    }
    values[j].reverse()
  }

  for(let i = 0; i < secondInput.length; i++) {
    const command = secondInput[i]
    const to = command[2]-1;
    const from = command[1]-1;
    const temp = [];
    for(let j = 0; j < command[0]; j++) {
      temp.push(values[from].pop());
    }
    values[to] = values[to].concat(temp)
  }
  return values.map(input => {
    for(let i = 0; i < input.length; i++) {
      const temp = input.pop()
      if(temp != ' ') {
        return temp
      }
    }
  }).join('')
  
  
}
const part2 = (rawInput) => {
  const { firstInput, secondInput } = parseInput(rawInput)
  const col = parseInt(firstInput[firstInput.length-1].charAt(firstInput[firstInput.length-1].length-2))
  const values = Array.from(new Array(col), element => []);

  for(let j = 0; j < col; j++) {
    for(let i = 0; i < firstInput.length-1; i++) {
      const temp = firstInput[i]
      const tempValue = temp.slice(4*j+1, 4*j+2)
      if(tempValue != ' ') {
        values[j].push(tempValue)
      }
      
    }
    values[j].reverse()
  }

  for(let i = 0; i < secondInput.length; i++) {
    const command = secondInput[i]
    const to = command[2]-1;
    const from = command[1]-1;
    const temp = [];
    for(let j = 0; j < command[0]; j++) {
      temp.push(values[from].pop());
    }
    values[to] = values[to].concat(temp.reverse())
  }
  return values.map(input => {
    for(let i = 0; i < input.length; i++) {
      const temp = input.pop()
      if(temp != ' ') {
        return temp
      }
    }
  }).join('')
  
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
