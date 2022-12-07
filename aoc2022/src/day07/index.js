import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput.split('\n').filter(input => input.split(' ')[1] != 'ls')

const whichCommand = (inputCommandLine) => {
  if(inputCommandLine.split(' ')[1] === 'cd') {
    return { result: 'cd', path: inputCommandLine.split(' ')[2]}
  }
  if(inputCommandLine.split(' ')[1] === 'ls') {
    return { result: 'ls' }
  }
  if(inputCommandLine.split(' ')[0] === 'dir') {
    return { result: 'dir', name: inputCommandLine.split(' ')[1] }
  }
  if(!isNaN(inputCommandLine.split(' ')[0]) ) {
    return { result: 'file', name: inputCommandLine.split(' ')[1], size: parseInt(inputCommandLine.split(' ')[0]) }
  }
  return ''
}

const calculateSum = (input, path) => {
  let sum = 0;
  
  for (const [key, value] of Object.entries(input)) {
    if(key.includes(path)) {
      sum += value
    }
  }
  return { path, sum }
}


const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const home = { '.': [] };
  let results = new Map();
  let currentPath = '.';

  for(let i = 1; i < input.length; i++) {
    let command = whichCommand(input[i])
    if(command.result == 'cd') {
      if(command.path != '.') {
        if(command.path != '..') {
          currentPath = currentPath+"/"+command.path
        } else {
          currentPath = currentPath.split('/').slice(0, -1).join('/')
        } 
      }
      if(!home.hasOwnProperty(currentPath)) {
        home[currentPath] = []
      }
    }
    if(command.result == 'file') {
      home[currentPath].push({ size: command.size})
    } 
  }

  for (const key in home) {
    if (Object.hasOwnProperty.call(home, key)) {
      home[key] = home[key].reduce((prev, cur) => prev + cur.size, 0)
    }
  }

  for (const [key, value] of Object.entries(home)) {
      let result = calculateSum(home, key);
      results.set(result.path, result.sum);
  }

  return _.sum(Array.from(results.values()).filter(i=>i<=100000))
  
  
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const home = { '.': [] };
  let results = new Map();
  let currentPath = '.';

  for(let i = 1; i < input.length; i++) {
    let command = whichCommand(input[i])
    if(command.result == 'cd') {
      if(command.path != '.') {
        if(command.path != '..') {
          currentPath = currentPath+"/"+command.path
        } else {
          currentPath = currentPath.split('/').slice(0, -1).join('/')
        } 
      }
      if(!home.hasOwnProperty(currentPath)) {
        home[currentPath] = []
      }
    }
    if(command.result == 'file') {
      home[currentPath].push({ size: command.size})
    } 
  }

  for (const key in home) {
    if (Object.hasOwnProperty.call(home, key)) {
      home[key] = home[key].reduce((prev, cur) => prev + cur.size, 0)
    }
  }

  for (const [key, value] of Object.entries(home)) {
    let result = calculateSum(home, key);
    results.set(result.path, result.sum);
}

  return Array.from(results.values()).filter(i=>i>=30000000 - ( 70000000 - results.get('.') )).sort(((a, b) => a - b))[0]
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
