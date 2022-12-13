import run from "aocrunner"
import _ from 'lodash'

// let StartEndPos = { startPos: { x: 0, y: 0 }, endPos: { x: 0, y: 0 } };

const parseInput = (rawInput) => rawInput.split('\n').map(i=>i.split(''))
// .trim()
// .split("\n")
// .map((line, indexY) =>
//   line.split("").map((char, indexX) => {
//     if (char === "S") {
//       StartEndPos.startPos = { x: indexX, y: indexY };
//       return Infinity;
//     }
//     if (char === "E") {
//       StartEndPos.endPos = { x: indexX, y: indexY };
//       return 122;
//     } else return char.charCodeAt(0);
//   })
// );

const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1]
]

// const isInGrid = (coordinates, input) => {
//   return _.inRange(coordinates[0], 0, input.length) && _.inRange(coordinates[1], 0, input[coordinates[0]].length)
// }

const canReach = (start, target) => {
  return _.inRange((target.charCodeAt(0) - start.charCodeAt(0)), -1, 2)
}
const findFirstAndFinal = (input) => {
  const positions = {
    start: [],
    finish: []
  }
  input.forEach(i=>{
    i.forEach(e=> {
      if(e === 'S') {
        positions.start = [ input.indexOf(i), i.indexOf(e)].join('.')
      }
      if(e === 'E') {
        positions.finish = [ input.indexOf(i), i.indexOf(e) ].join('.')
      }
    })
  })
  return positions
}

const coordinateToString = (coordinate) => {
  return coordinate.join('.')
}

const stringToCoordinate = (string) => {
  return string.split('.')
}

const findShortestPath = (input, start, letters) => {
  let distances = {}
  let visitedNodes = []
  let curPosition = start
  let queue = []
  let neighbours = []
  for(let i = 0; i < input.length; i++) {
    let row = []
    for(let j = 0; j < input[i].length; j++) {
      let neigh = [];
      directions.forEach(dir => {
        if(input[i+dir[0]]?.[j+dir[1]] !== undefined) {
          console.log(letters[i][j])
          if(canReach(letters[i][j], letters[i+dir[0]][j+dir[1]])) {
            neigh.push(input[i+dir[0]]?.[j+dir[1]])
          }
        }
      })
      row.push(neigh)
    }
    neighbours.push(row)
  }
  queue.push(start)
  while(queue.length > 0) {
    let curNodeParsed = queue.unshift()
    let curNodeCoordinates = curNodeParsed.split('.')
    let neighs = neighbours[0][curNodeCoordinates[0]][CurNodeCoordinates[1]]
    for(let i = 0; i < neighs.length; i++) {
      if(!visitedNodes.contains(curNodeParsed) && distances[curNodeParsed] <= distances?.[neighs[i]]) {
      
      }
    }
    visitedNodes.push(curNodeParsed)
  }
}


// const createTable = (input) => {
//   const table = []
//   for(let i = 0; i < input.length; i++) {
//     for (let j = 0; j < input[i].length; j++) {
//       const closeStuff = []
//       const futureUpNode = [i, j].map((a, index) => a + directions.UP[index])
//       const futureDownNode = [i, j].map((a, index) => a + directions.DOWN[index])
//       const futureLeftNode = [i, j].map((a, index) => a + directions.LEFT[index])
//       const futureRightNode = [i, j].map((a, index) => a + directions.RIGHT[index])
//       if(isInGrid(futureUpNode, input)) {
//         if(canReach(input[i][j], input[futureUpNode[0]][futureUpNode[1]])) {
//           closeStuff.push(futureUpNode.join('.'))
//         }
//       }
//       if(isInGrid(futureDownNode, input)) {
//         if(canReach(input[i][j], input[futureDownNode[0]][futureDownNode[1]])) {
//           closeStuff.push(futureDownNode.join('.'))
//         }
//       }
//       if(isInGrid(futureLeftNode, input)) {
//         if(canReach(input[i][j], input[futureLeftNode[0]][futureLeftNode[1]])) {
//           closeStuff.push(futureLeftNode.join('.'))
//         }
//       }
//       if(isInGrid(futureRightNode, input)) {
//         if(canReach(input[i][j], input[futureRightNode[0]][futureRightNode[1]])) {
//           closeStuff.push(futureRightNode.join('.'))
//         }
//       }
//       table.push({[[i, j].join('.')]: closeStuff})
//     }
//   }
//   return table;
// }

// const minDistance = (dist, visitedNodes, table) => {
     
//   let min = Number.MAX_VALUE;
//   let min_index = -1;
   
//   for(let v = 0; v < table.length-1; v++)
//   {
//     console.log('Loop ' + v + ' ' + (dist[v] <= min))
//       if (visitedNodes[v] == false && dist[v] <= min)
//       {
//           min = dist[v];
//           min_index = v;
//       }
//   }
//   return min_index;
// }

// const dijkstra = (table, src) => {
//     let dist = [];
//     let visitedNodes = [];
//     let size = table.length;
     
//     // Initialize all distances as
//     // INFINITE and stpSet[] as false

//     for(let i = 0; i < size; i++)
//     {
//         dist[i] = Number.MAX_VALUE;
//         visitedNodes[i] = false;
//     }
     
//     // Distance of source vertex
//     // from itself is always 0
//     dist[0] = 0;
//     // Find shortest path for all vertices
//     for(let i = 0; i < size - 1;i++)
//     {
//         // Pick the minimum distance vertex
//         // from the set of vertices not yet
//         // processed. u is always equal to
//         // src in first iteration.
//         let u = minDistance(dist, visitedNodes, table);
//         // // Mark the picked vertex as processed
//         visitedNodes[u] = true;
        
         
//         for(let v = 0; v < size-1; v++)
        
//         {
//           // console.log(u)
//           // console.log(Object.keys(table[u])[0])
//           // console.log(table[u][Object.keys(table[u])[0]])
//           // console.log(Object.keys(table[v])[0])
//           // console.log((table[u][Object.keys(table[u])[0]]).includes(Object.keys(table[v])[0]))
//             if (!visitedNodes[v] && 
//               (table[u][Object.keys(table[u])[0]]).includes(Object.keys(table[v])[0]) &&
//                    dist[u] != Number.MAX_VALUE &&
//                    dist[u] + 1 < dist[v])
//             {
//                 dist[v] = dist[u] + 1;
//             }
//         }
//     }
     
//     // Print the constructed distance array
//     //console.log(visitedNodes)
//     return dist;
// }


const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const positions = findFirstAndFinal(input)

  return findShortestPath(parseInput(rawInput.replaceAll('S', 'a').replaceAll('E', 'z')).map((e, i) => e.map((a, b) => [i, b].join('.'))), positions.start, parseInput(rawInput.replaceAll('S', 'a').replaceAll('E', 'z')))
}

const part2 = (rawInput) => {
  //const input = 



  //return 
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
