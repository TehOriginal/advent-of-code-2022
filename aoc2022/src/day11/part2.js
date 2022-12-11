const operator_2 =  {
'+': function (x, y) { 
    {
    const result = numberObject(0)
    primeNumbers.forEach(element => {
        result[element] = (x[element] + y)%parseInt(element)
    })
    return result;
    }
},
'*': function (x, y) { 
    const result = numberObject(0)
    primeNumbers.forEach(element => {
        result[element] = (x[element] * y)%parseInt(element)
    })
    return result;
    },
    '^2': function (x) { 
    const result = numberObject(0)
    primeNumbers.forEach(element => {
        result[element] = (Math.pow(x[element],2))%parseInt(element)
    })
    return result;
    },
}

const numberObject = (number) => {
    const object = {}
    primeNumbers.forEach(element => {
        object[element] = number%parseInt(element);
    });
    return object;
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

const primeNumbers = [2, 3, 5,7, 11, 13, 17, 19, 23]

const parser_2 = (monkey) => {
const id = monkey[0].split(' ')[1][0]
const items = monkey[1].replace(/,/g, '').split(' ').filter(Number).map(i=>parseInt(i)).map(input=>{
    return numberObject(input)
})
const operation = functionParser_2(monkey[2].replace(/Operation: /g, '').slice(6), 'operation')
const test = functionParser_2(monkey[3].map(i=>i.split(' ').filter(i=> !isNaN(i))).flatMap(i=>i), 'test')
return new Monkey(id, items, operation, test, 0)
}

const functionParser_2 = (line, type) => {
switch(type) {
    case 'operation':
    const parsedLine = line.split(' ');
    const a = (parsedLine[0] === 'old') ? 'startingValue' : parseInt(parsedLine[0])
    const b = (parsedLine[2] === 'old') ? 'startingValue' : parseInt(parsedLine[2])

    if(parsedLine[2] === 'old') {
        return function (startingValue) { return operator_2['^2'](eval(a))}
    }

    return function (startingValue) { return operator_2[parsedLine[1]](eval(a), parseInt(parsedLine[2]))}
    case 'test':
    return function (input) { return (input[line[0]] == 0) ? line[1] : line[2]}
}
}


const traverseMonkey_2 = (monkey) => {
    let currentItems = monkey.items
    let item = monkey.operation(currentItems.shift())
    let toId = parseInt(monkey.test(item))
    let newMonkey = new Monkey(monkey.id, currentItems, monkey.operation, monkey.test, monkey.inspectedItems+1)
    return {
        toId,
        item,
        newMonkey,
    }
}

const parseInput_2 = (rawInput) => rawInput.split('\n\n')
    .map(i=>i.split('\n').map(e=>e.trim()))
    .map(i=>{
    return [i[0], i[1], i[2], [i[3], i[4], i[5]]]
    })
    .map(i=>parser_2(i))


const prettyPrint = (input) => {
    input.forEach(element => {
    console.log(element.id)
    element.items.forEach(i => {
        console.log('---------------------------------------')
        console.log(i)
        console.log('---------------------------------------')
    })
    });
}


export const Part2 = (rawInput) => {
    const input = parseInput_2(rawInput)

    let rounds = 0;
  
    while( rounds != 10000) {
      for(let i = 0; i < input.length; i++) {
        while(input[i].items.length != 0) {
            const { toId, item, newMonkey } = traverseMonkey_2(input[i])
            input[i] = newMonkey;
            const newItems = input[toId].items.concat([item])
            input[toId] = new Monkey(input[toId].id, newItems, input[toId].operation, input[toId].test, input[toId].inspectedItems)
        }
      }
      rounds++
    }
  
    return input.map(i=>i.inspectedItems).sort((a, b) => b - a).splice(0, 2).reduce((prev, cur) => prev * cur)
}