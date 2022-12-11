import run from "aocrunner"
import { Part2 } from './part2.js'

const operator =  {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '/': function (x, y) { return x / y },
  '*': function (x, y) { return x * y },
}

class Monkey {
  constructor(id, items, operation, test, inspectedItems) {
    this.id = parseInt(id)
    this.items = items
    this.operation = operation
    this.test = test
    this.inspectedItems = inspectedItems
  }
}

const parser = (monkey) => {
  const id = monkey[0].split(' ')[1][0]
  const items = monkey[1].replace(/,/g, '').split(' ').filter(Number).map(i=>parseInt(i))
  const operation = functionParser(monkey[2].replace(/Operation: /g, '').slice(6), 'operation')
  const test = functionParser(monkey[3].map(i=>i.split(' ').filter(i=> !isNaN(i))).flatMap(i=>i), 'test')
  return new Monkey(id, items, operation, test, 0)
}



const functionParser = (line, type) => {
  switch(type) {
    case 'operation':
      const parsedLine = line.split(' ');
      const a = (parsedLine[0] === 'old') ? 'startingValue' : parseInt(parsedLine[0])
      const b = (parsedLine[2] === 'old') ? 'startingValue' : parseInt(parsedLine[2])
      return function (startingValue) { return operator[parsedLine[1]](eval(a), eval(b))}
    case 'test':
      return function (value) { return (value%line[0] === 0) ? line[1] : line[2]}
  }
}




const traverseMonkey = (monkey) => {
  let currentItems = monkey.items
  let item = Math.floor(monkey.operation(currentItems.shift())/3)
  let toId = parseInt(monkey.test(item))
  let newMonkey = new Monkey(monkey.id, currentItems, monkey.operation, monkey.test, monkey.inspectedItems+1)
  return {
    toId,
    item,
    newMonkey,
  }
}

const parseInput = (rawInput) => rawInput.split('\n\n')
  .map(i=>i.split('\n').map(e=>e.trim()))
  .map(i=>{
    return [i[0], i[1], i[2], [i[3], i[4], i[5]]]
  })
  .map(i=>parser(i))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let rounds = 0;

  while( rounds != 20) {
    for(let i = 0; i < input.length; i++) {
      while(input[i].items.length != 0) {
        const { toId, item, newMonkey } = traverseMonkey(input[i])
        input[i] = newMonkey;
        const newItems = input[toId].items.concat([item])
        input[toId] = new Monkey(input[toId].id, newItems, input[toId].operation, input[toId].test, input[toId].inspectedItems)
      }
    }
    rounds++
  }
  return input.map(i=>i.inspectedItems).sort((a, b) => b - a).splice(0, 2).reduce((prev, cur) => prev * cur)
}

const part2 = (rawInput) => {
  const result = Part2(rawInput)
 return result
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
