import run from "aocrunner"
import _ from "lodash"
import fs from 'fs'

const parseInput = (rawInput) => rawInput.split('\n').map(i=>i.split(' -> ')).map(i=>i.map(e=>e.split(',').map(a=>parseInt(a))))

class Grid {
  constructor(rocks) {
    this.rocks = rocks
  }
}

const passSand = (grid, maxy) => {
  let currentSandPos = [500, 0]
  let didHit = false
  let end = false;
  while(!didHit) {
    if(elementExists([currentSandPos[0], currentSandPos[1]+1], grid.rocks)) {
      if(elementExists([currentSandPos[0]-1, currentSandPos[1]+1], grid.rocks)) {
        if(elementExists([currentSandPos[0]+1, currentSandPos[1]+1], grid.rocks)) {
          currentSandPos = [currentSandPos[0], currentSandPos[1]]
          didHit = true
        } else {
          currentSandPos = [currentSandPos[0]+1, currentSandPos[1]+1]
        }
      } else {
        currentSandPos = [currentSandPos[0]-1, currentSandPos[1]+1]
      }
    } else {
      currentSandPos = [currentSandPos[0], currentSandPos[1]+1]
    }
   
    if(currentSandPos[1] > maxy) {
      end = true
      didHit = true
    }
  }
  let newRocks = grid.rocks.concat([ currentSandPos ])
  return { grid: new Grid(newRocks), end }
}

const passSand2 = (grid, maxy) => {
  let currentSandPos = [500, 0]
  let didHit = false
  let end = false;
  while(!didHit) {    
    if(elementExists([currentSandPos[0], currentSandPos[1]+1], grid.rocks)) {
      if(elementExists([currentSandPos[0]-1, currentSandPos[1]+1], grid.rocks)) {
        if(elementExists([currentSandPos[0]+1, currentSandPos[1]+1], grid.rocks)) {
          currentSandPos = [currentSandPos[0], currentSandPos[1]]
          didHit = true
        } else {
          currentSandPos = [currentSandPos[0]+1, currentSandPos[1]+1]
        }
      } else {
        currentSandPos = [currentSandPos[0]-1, currentSandPos[1]+1]
      }
    } else {
      currentSandPos = [currentSandPos[0], currentSandPos[1]+1]
    }
           
    if(currentSandPos[0] == 500 && currentSandPos[1] == 0) {
      end = true
      didHit = true
    }
  }
  let newRocks = grid.rocks.concat([ currentSandPos ])
  return { grid: new Grid(newRocks), end }
}

const elementExists = (element, array) => {
  for(let i = 0; i < array.length; i++) {
    if(element[0] == array[i][0] && element[1] == array[i][1]) {
      return true
    }
  }
  return false
}

const draw = (grid, startingGrid, rangex, rangey) => {
  let content = []
  let rocks = grid.rocks
  let startingRocks = startingGrid.rocks
  for(let i = 0; i < rangey[1]+4; i++) {
    for(let j = 0; j < 700; j++) {
      if(j == 500 && i == 0) {
        content.push('X')
      } else {
        if(elementExists([ j, i ], rocks)) {
          if(elementExists([ j, i ], startingRocks)) {
            content.push('#')
          } else {
            content.push('O')
          }
         
        } else {
          content.push('.')
        }
      }
    }
    content.push('\n')
  }
  return content.join('')
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let startingGrid = new Grid([]);
  let rocks = []
  let maxxy = 0
  input.forEach((element)=> {
   
    for(let j = 0; j < element.length-1; j++) {
      let [x1, y1] = element[j]
      let [x2, y2] = element[j+1]
      if(x1 != x2) {
        let minx = Math.min(x1, x2)
        let maxx = Math.max(x1, x2)
        for(let b = minx; b <= maxx; b++) {
          if(y1 > maxxy) {
            maxxy = y1
          }
          rocks.push([b, y1])
        }
      }
      if(y1 != y2) {
        let miny = Math.min(y1, y2)
        let maxy = Math.max(y1, y2)
        for(let b = miny; b <= maxy; b++) {
          if(maxy > maxy) {
            maxxy = maxy
          }
          rocks.push([x1, b])
        }
      }
    }
    rocks = Array.from(new Set(rocks.map(JSON.stringify)), JSON.parse)
    startingGrid = new Grid(_.uniq(rocks))
  })
  let end = false;
  let count = 0
  let grid = startingGrid
  while(!end) {
    let response = passSand(grid, maxxy)
    grid = response.grid
    end = response.end
    count++
  }
  // console.dir(grid.rocks, {'maxArrayLength': null});
  // console.log(maxxy)
  // //let content = draw(grid, startingGrid)
  // try {
  //   fs.writeFileSync('./test.txt', content);
  //   // file written successfully
  // } catch (err) {
  //   console.error(err);
  // }
  return count-1
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let startingGrid = new Grid([]);
  let rocks = []
  let rangey = [Number.MAX_VALUE, 0]
  let rangex = [Number.MAX_VALUE, 0]
  input.forEach((element)=> {
   
    for(let j = 0; j < element.length-1; j++) {
      let [x1, y1] = element[j]
      let [x2, y2] = element[j+1]
      let minx = Math.min(x1, x2)
      let maxx = Math.max(x1, x2)
      let miny = Math.min(y1, y2)
      let maxy = Math.max(y1, y2)
      if(maxy >= rangey[1]) {
        rangey[1] = maxy
      }
      if(maxx >= rangex[1]) {
        rangex[1] = maxx
      }
      if(miny < rangey[0]) {
        rangey[0] = miny
      }
      if(minx < rangex[0]) {
        rangex[0] = minx
      }
      if(x1 != x2) {
        for(let b = minx; b <= maxx; b++) {
          rocks.push([b, y1])
        }
      }
      if(y1 != y2) {
       
        for(let b = miny; b <= maxy; b++) {
          rocks.push([x1, b])
        }
      }
    }
    rocks = Array.from(new Set(rocks.map(JSON.stringify)), JSON.parse)
    startingGrid = new Grid(_.uniq(rocks))
  })
  let bottom = []
  for(let u = 0; u < 700; u++) {
    bottom.push([ u, rangey[1]+2])
  }
  startingGrid = new Grid(startingGrid.rocks.concat(bottom))
  let grid = startingGrid
  let end = false;
  let count = 0
  while(!end) {
    let response = passSand2(grid, rangey[1])
    grid = response.grid
    end = response.end
    count++
  }
  let content = draw(grid, startingGrid, rangex, rangey)
  try {
    fs.writeFileSync('./test.txt', content);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
  return count
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
