import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(i=>i.split(''))

const countTrees = (input) => {
  let treeCount = 0;
  for(let i = 0; i < input.length; i++) {
    if(i == 0 || i == input.length-1) {
      treeCount += input[i].length;
    } else {
      for(let j = 0; j < input[i].length; j++) {
        if(j == 0 || j == input[i].length-1) {
          treeCount++;
        }
        else {
          let seenTree = true;
          for(let a = 0; a < input.length; a++) {
            if(a < i) {
              if(input[i][j] <= input[a][j]) {
                seenTree = false
                a = i
              }
            }
            if(a == i) {
              if(seenTree) {
                break;
              } else {
                seenTree = true;
              }
            }
            if(a > i) {
              if(input[i][j] <= input[a][j]) {
                seenTree = false
                break;
              }
            }
          }

          if(seenTree) {
            treeCount++
            continue;
          }

          seenTree = true;

          for(let a = 0; a < input[i].length; a++) {
            if(a < j) {
              if(input[i][j] <= input[i][a]) {
                seenTree = false
                a = j
              }
            }
            if(a == j) {
              if(seenTree) {
                break;
              } else {
                seenTree = true;
              }
            }
            if(a > j) {
              if(input[i][j] <= input[i][a]) {
                seenTree = false
                break;
              }
            }
          }
          if(seenTree) {
            treeCount++
          }
        }
      }
    }
    
  }
  return treeCount;
}

const countTreeScoreToArray = (input) => {
  let treeScore = [];
  
  for(let i = 0; i < input.length; i++) {
    treeScore.push([])
    for(let j = 0; j < input[i].length; j++) {
      treeScore[i].push(calculateTreeScore(input, i, j))
    }
  }

  return treeScore;
}

const calculateTreeScore = (input, row, col) => {
    let up = 0, down = 0, right = 0, left = 0;
    let upDone = false, downDone = false, rightDone = false, leftDone = false;
    for(let i = 1; i < input.length; i++) {
      if(row + i < input.length && !downDone) {
        if(input[row+i][col] >= input[row][col]) {
          downDone = true
        }
        down += 1
      }
      if(row - i > -1 && !upDone) {
        if(input[row-i][col] >= input[row][col]) {
          upDone = true
        }
        up += 1
      }
      if(col + i < input.length && !rightDone) {
        if(input[row][col+i] >= input[row][col]) {
          rightDone = true
        }
        right += 1
      }
      if(col - i > -1 && !leftDone) {
        if(input[row][col-i] >= input[row][col]) {
          leftDone = true 
        }
        left += 1
      }
    }  
    return up*down*right*left;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  
  return countTrees(input);
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return countTreeScoreToArray(input).flatMap(i=>i).sort((a,b)=>b-a)[0]
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
