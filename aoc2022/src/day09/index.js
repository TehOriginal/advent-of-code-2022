import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput.split('\n').map(i=>i.split(' ')).map(i=>{ return { dir: i[0], count: parseInt(i[1]) } })

const directions = {
  D: [0, -1],
  U: [0, 1],
  L: [-1, 0],
  R: [1, 0],
}

const checkTailRelativeToHead = (tail, head) => {
  let sum = tail.map((e, i)=> head[i] - e)
  return sum
}

const tailFollow1 = (tail, relativeDistance) => {
  let resultCol = tail[0]
  let resultRow = tail[1]

  if(Math.abs(relativeDistance[0]) + Math.abs(relativeDistance[1]) > 2) {
    resultCol = (relativeDistance[0] <= -1) ? tail[0]+Math.min(relativeDistance[0]+1, -1) : tail[0]+Math.max(relativeDistance[0]-1, 1)
    resultRow = (relativeDistance[1] <= -1) ? tail[1]+Math.min(relativeDistance[1]+1, -1) : tail[1]+Math.max(relativeDistance[1]-1, 1)
  } else {
    if(relativeDistance[0] == 0) resultRow = (relativeDistance[1] <= -1) ? tail[1]+relativeDistance[1]+1 : tail[1]+relativeDistance[1]-1
    if(relativeDistance[1] == 0) resultCol = (relativeDistance[0] <= -1) ? tail[0]+relativeDistance[0]+1 : tail[0]+relativeDistance[0]-1
  }
  return [resultCol, resultRow]
}

const tailFollow2 = (tail, relativeDistance) => {
  let resultCol = tail[0]
  let resultRow = tail[1]

  if(Math.abs(relativeDistance[0]) + Math.abs(relativeDistance[1]) > 2) {
    resultCol = (relativeDistance[0] <= -1) ? tail[0]+Math.min(relativeDistance[0]+1, -1) : tail[0]+Math.max(relativeDistance[0]-1, 1)
    resultRow = (relativeDistance[1] <= -1) ? tail[1]+Math.min(relativeDistance[1]+1, -1) : tail[1]+Math.max(relativeDistance[1]-1, 1)
  } else {
    if(relativeDistance[0] == 0) resultRow = (relativeDistance[1] <= -1) ? tail[1]+relativeDistance[1]+1 : tail[1]+relativeDistance[1]-1
    if(relativeDistance[1] == 0) resultCol = (relativeDistance[0] <= -1) ? tail[0]+relativeDistance[0]+1 : tail[0]+relativeDistance[0]-1
  }
  return [resultCol, resultRow]
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const headPositions = []
  const tailPositions = []
  let curHeadPosition = [0, 0]
  let curTailPosition = [0, 0]
  for(var i = 0; i < input.length; i++) {
    for(var a = 0; a < input[i].count; a++) {
      const [col, row] = directions[input[i].dir]
      curHeadPosition = [curHeadPosition[0]+col, curHeadPosition[1]+row]
      if(checkTailRelativeToHead(curTailPosition, curHeadPosition).filter(i=>i > 1 || i < -1).length != 0) {
        curTailPosition = tailFollow1(curTailPosition, checkTailRelativeToHead(curTailPosition, curHeadPosition))
      }
      tailPositions.push(curTailPosition)
      headPositions.push(curHeadPosition)
    }
  }
  return _.uniqWith(tailPositions, _.isEqual).length
  
  
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const tailPositions = []
  let ropePositions = [ [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
  for(let i = 0; i < input.length; i++) {
    for(let a = 0; a < input[i].count; a++) {
      const [col, row] = directions[input[i].dir]
      ropePositions[0] = [ropePositions[0][0]+col, ropePositions[0][1]+row]
      for(let b = 1; b < ropePositions.length;b++) {
        if(checkTailRelativeToHead(ropePositions[b], ropePositions[b-1]).filter(i=>i > 1 || i < -1).length != 0) {
          ropePositions[b] = tailFollow2(ropePositions[b], checkTailRelativeToHead(ropePositions[b], ropePositions[b-1]))
        }
      }
      tailPositions.push(ropePositions[9])
    }
    tailPositions.push([-1, -1])
  }
  
  return _.uniqWith(tailPositions, _.isEqual).length - 1
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
