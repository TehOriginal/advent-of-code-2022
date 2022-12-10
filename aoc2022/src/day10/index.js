import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(i=>i.split(' ')).flatMap(e=>e)

const draw = (array) => {
  for(let i = 0; i < array.length/40; i++) {
    for(let j = 0; j < 40; j++) {
      process.stdout.write(array[(i*40)+j])
    }
    process.stdout.write('\n')
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let X = 1;
  let values = []
  input.forEach((e, i) => {
    if(!isNaN(e)) {
      X += parseInt(e)
    }
    values.push(X)
  })

  return values[18]*20+values[58]*60+values[98]*100+values[138]*140+values[178]*180+values[218]*220
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let X = 1;
  let values = [ 1 ]
  let grid = []

  input.forEach((e, i) => {
    if(!isNaN(e)) {
      X += parseInt(e)
    }
    values.push(X)
  })
  values.splice(-1)
  const chunkSize = 40;

  for(let i = 0; i < values.length; i++) {
    let spritePosition = [values[i]-1, values[i], values[i]+1]
    if(spritePosition.includes(i%40)) {
      grid.push('#')
    } else {
      grid.push('.')
    }
  }
  

  draw(grid)
  return 'EHZFZHCZ'

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
