import run from "aocrunner"
import fs from 'fs'
import { fileURLToPath } from "url"


const parseInput = (rawInput) => rawInput.split('\n').map(i=>i.split(' ').map(e=>e.split('').filter(u=>!isNaN(u) || u === '-')).filter(u=>u.length !=0).map(u=>parseInt(u.join(''))))

const getDistance = (signal, beacon) => {
  return Math.abs(signal[0] - beacon[0]) + Math.abs(signal[1] - beacon[1])
}

const getDifference = (setA, setB) => {
  return new Set(
    [...setA].filter(element => !setB.has(element))
  );
}

const draw = (filledSpaces, beacons, signals, corners, rangex, rangey) => {
  let content = ''
  for(let i = rangey[0]; i <= rangey[1]; i++) {
    for(let j = rangex[0]; j <= rangex[1]; j++) {
      if([j,i].join('.') == '14.11') {
        content = content.concat('X')
      }
      else if(corners.has([j,i].join('.'))) {
        content = content.concat('C')
      }
      else if(signals.has([j,i].join('.'))) {
        content = content.concat('S')
      }
      else if(beacons.has([j,i].join('.'))) {
        content = content.concat('B')
      }
      else if(filledSpaces.has([j,i].join('.'))) {
        content = content.concat('#')
      }
      else {
        content = content.concat('.')
      }
    }
    content = content.concat('\n')
  }
  return content
}

const part1 = (rawInput) => {
  // const input = parseInput(rawInput)
  // let filledSpaces = new Set()
  // let beacons = new Set()
  // const rowOfInterest = 2000000
  // input.forEach(element => {
  //   let distance = getDistance([element[0], element[1]], [element[2], element[3]])
  //   if(element[1] == rowOfInterest) {
  //     beacons.add([element[0], element[1]].join('.'))
  //   }
  //   if(element[3] == rowOfInterest) {
  //     beacons.add([element[2], element[3]].join('.'))
  //   }
  //   let differenceInY = Math.abs(element[1] - rowOfInterest)
  //   if( differenceInY <= distance) {
  //     let differenceInX = distance - differenceInY
  //     for(let i = element[0] - differenceInX; i <= element[0] + differenceInX; i++) {
  //       filledSpaces.add([i, rowOfInterest].join('.'))
  //     }
  //   }
  // })


  // return getDifference(filledSpaces, beacons).size
  
  
}

const part2 = (rawInput) => {
  // const input = parseInput(rawInput)
  
  // let rows = []
  // for(let j = 0; j < 4000000; j++) {
  //   let filledSpaces = 0
  //   let minx = Number.MAX_VALUE
  //   let maxx = Number.MIN_VALUE
  //   console.log(j)
  //   for(let i = 0; i < input.length; i++) { 
  //     let element = input[i]
  //     let distance = getDistance([element[0], element[1]], [element[2], element[3]])
  //     let differenceInY = Math.abs(element[1] - j)
  //     if( differenceInY <= distance) {
  //       let differenceInX = distance - differenceInY
  //       if(minx > element[0]-differenceInX) {
  //         minx = element[0]-differenceInX
  //       }
  //       if(maxx < element[0]+differenceInX) {
  //         maxx = element[0]+differenceInX
  //       }
  //       filledSpaces += differenceInX*2-1
  //     }
  //   }
  //   if(maxx-minx-1 > filledSpaces) {
  //     rows.push(j)
  //   }
  // }
  // return rows
  const input = parseInput(rawInput)
  let distances = input.map(i=>getDistance([i[0], i[1]],[i[2], i[3]]))
  let done = false;
  let answer = -1;
  for(let i = 0; i < 4000000; i++) {
    let pairs = []
    for(let u = 0; u < distances.length; u++) {
      let differenceInY = Math.abs(input[u][1] - i)
      if( differenceInY <= distances[u]) {
        let differenceInX = distances[u] - differenceInY
        let minx = input[u][0] - differenceInX
        let maxx = input[u][0] + differenceInX
        pairs.push([minx, maxx])
      }
    }
    pairs = pairs.sort((a, b) => a[0] - b[0])
    let range = [pairs[0][0], pairs[0][1]]
    
    for(let u = 0; u < pairs.length-1; u++) {
      if(range[1]+1 >= pairs[u+1][0]) {
        if(range[1] < pairs[u+1][1]) {
          range = [range[0], pairs[u+1][1]]
        }
      }
      else {
        answer = [i, pairs[u][1]+1]
        console.log(answer)
        done = true;
        break;
      }
    }
    if(done) {
      break;
    }
  }

  return answer[1]*4000000 + answer[0]

  // const input = parseInput(rawInput)
  // let distances = input.map(i=>getDistance([i[0], i[1]],[i[2], i[3]]))
  
  // let coordinate = [-1, -1]
  // let count = 0
  // let plsEnd = false
  // for(let i = 0; i < 4000000; i++) {
  //   for(let j = 0;j < 4000000; j++) {
  //     if(((i+1)*(j+1))%1000000000 === 0) {
  //       console.log("PROGESS" + i + ' ' + j)
  //     }
  //     let chosenOne = true
  //     for(let u = 0; u < input.length; u++) {
  //       let distance = getDistance([i, j], [input[u][0], input[u][1]])
  //       chosenOne = distance > distances[u] && chosenOne
  //     }
  //     if(chosenOne) {
  //       coordinate = [i, j]
  //       plsEnd = true
  //     }
  //     if(plsEnd) {
  //       break;
  //     }
  //   }
  //   if(plsEnd) {
  //     break;
  //   }
  // }
  // return coordinate
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
