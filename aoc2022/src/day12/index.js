import run from "aocrunner"
import _ from 'lodash'

let StartEndPos = { startPos: { x: 0, y: 0 }, endPos: { x: 0, y: 0 } };

const parseInput = (rawInput) => rawInput.trim()
.split("\n")
.map((line, indexY) =>
  line.split("").map((char, indexX) => {
    if (char === "S") {
      StartEndPos.startPos = { x: indexX, y: indexY };
      return Infinity;
    }
    if (char === "E") {
      StartEndPos.endPos = { x: indexX, y: indexY };
      return 122;
    } else return char.charCodeAt(0);
  })
);

// const directions = {
//   UP: [-1, 0],
//   DOWN: [1, 0],
//   LEFT: [0, -1],
//   RIGHT: [0, 1],
// }

// const isInGrid = (coordinates, input) => {
//   return _.inRange(coordinates[0], 0, input.length) && _.inRange(coordinates[1], 0, input[coordinates[0]].length)
// }

// const canReach = (start, target) => {
//   return _.inRange((target.charCodeAt(0) - start.charCodeAt(0)), -1, 2)
// }
// const findFirstAndFinal = (input) => {
//   const positions = {
//     start: [],
//     finish: []
//   }
//   input.forEach(i=>{
//     i.forEach(e=> {
//       if(e === 'S') {
//         positions.start = [ input.indexOf(i), i.indexOf(e)].join('.')
//       }
//       if(e === 'E') {
//         positions.finish = [ input.indexOf(i), i.indexOf(e) ].join('.')
//       }
//     })
//   })
//   return positions
// }

// const coordinateToString = (coordinate) => {
//   return coordinate.join('.')
// }

// const stringToCoordinate = (string) => {
//   return string.split('.')
// }

// const findShortestPath = (input, start) => {
//   let distances = new Map()
//   distances.set(coordinateToString(start), 0)
//   let visitedNodes = [  ]
//   let curPosition = start
//   while(visitedNodes.length < input.flatMap(i=>i).length) {
//     console.log("WHILE CHECK: " + visitedNodes.length + ' ' + input.flatMap(i=>i).length)
//     console.log(curPosition)
//     let curNode = input[curPosition[0]][curPosition[1]]
//     let shortestCoordinate = { };
//     visitedNodes.push(coordinateToString(curPosition))
//     console.log(visitedNodes)
//     console.log(curNode + ' | ' + curPosition)
//     for(let e = -1; e <= 1; e++) {
//       if(e != 0) {
//         console.log('Iteration: ' + e)
//         console.log('Current Coordinate values: ')
//         console.log(curPosition)
//         console.log('X Coordinate values: ' + curPosition[0] + ' ' + (curPosition[1]+e))
//         console.log('X Node in range: ' + _.inRange(curPosition[1]+e, 0, input[0].length))
//         if(_.inRange(curPosition[1]+e, 0, input[0].length)) {
//           let futureNodex = input[curPosition[0]][curPosition[1]+e]
//           let futureNodexCoordinates = [curPosition[0], curPosition[1]+e]
//           console.log('Nodex: ' + futureNodex + ' | ' + curPosition[0] + ' ' + (curPosition[1]+e))
//           console.log('Visited Nodes includes node: ' + visitedNodes.includes(coordinateToString(futureNodexCoordinates)))
//           console.log('Can reach: ' + canReach(curNode, futureNodex) + '|' + coordinateToString(futureNodexCoordinates))
//           if(canReach(curNode, futureNodex)) {
//             let curDistance = distances.get(coordinateToString(curPosition));
//             let futureDistance = distances.get(coordinateToString(futureNodexCoordinates));
//             console.log(curPosition)
//             curDistance = (curDistance) ? curDistance : null
//             if(curDistance == null) distances.set(coordinateToString(curPosition), null)
//             futureDistance = (futureDistance) ? futureDistance : null
//             let distance = (curDistance != 0) ? curDistance + 1 : 1;
//             console.log('Modifying distance: distance - ' + distance + ', curDistance - ' + curDistance + ', futureDistance ' + futureDistance + ',CHECK - ' + (curDistance > distance) + ', OTHER CHECK ' + (curDistance == null) + ', VISITOR CHECK ' + (!visitedNodes.includes(coordinateToString(futureNodexCoordinates))) )
//             console.log(visitedNodes)
//             if((futureDistance > distance || futureDistance == null) && !visitedNodes.includes(coordinateToString(futureNodexCoordinates))) {
//               distances.set(coordinateToString(futureNodexCoordinates), distance)
//               console.log("CHECK PASSED: " + coordinateToString(futureNodexCoordinates))
//               console.log(distances)
//             } else {
//               console.log("CHECK FAILED: " + coordinateToString(futureNodexCoordinates))
//               console.log(distances)
//               distances.set(coordinateToString(futureNodexCoordinates), distance)
//             }
//             console.log('Distance before shortestCoordinate check: ' + distance + ' ' + futureNodexCoordinates)
//             if(!visitedNodes.includes(coordinateToString(futureNodexCoordinates))){
//               console.log("Visited node check is happening")
//               if((shortestCoordinate.distance > distance) || Object.keys(shortestCoordinate).length == 0) {
//                 shortestCoordinate.distance = distance
//                 shortestCoordinate.coordinate = futureNodexCoordinates
//               }
//             } 
//           }
//         }
//         console.log('Y Coordinate values: ' + (curPosition[0]+e) + ' ' + curPosition[1])
//         console.log('Y Node in range: ' + _.inRange(curPosition[0]+e, 0, input.length))
//         if(_.inRange(curPosition[0]+e, 0, input.length)) {
//           let futureNodey = input[curPosition[0]+e][curPosition[1]]
//           let futureNodeyCoordinates = [curPosition[0]+e, curPosition[1]]
//           console.log('Nodey: ' + futureNodey + ' | ' + (curPosition[0]+e) + ' ' + curPosition[1])
//           console.log('VisitedNodes includes node: ' + visitedNodes.includes(coordinateToString(futureNodeyCoordinates)))
//           console.log('Can reach: ' + canReach(curNode, futureNodey))
//           if(canReach(curNode, futureNodey)) {
//             let curDistance = distances.get(coordinateToString(curPosition));
//             let futureDistance = distances.get(coordinateToString(futureNodeyCoordinates));
//             console.log(curPosition)
//             curDistance = (curDistance) ? curDistance : 0
//             futureDistance = (futureDistance) ? futureDistance : null
//             let distance = (curDistance != null) ? curDistance + 1 : 1;
//             console.log('Modifying distance: distance - ' + distance + ', curDistance - ' + curDistance + ', futureDistance ' + futureDistance + ',CHECK - ' + (curDistance > distance) + ', OTHER CHECK ' + (curDistance == null))
//             if(futureDistance > distance || futureDistance == null) {
//               distances.set(coordinateToString(futureNodeyCoordinates), distance)
//               console.log("CHECK PASSED: " + coordinateToString(futureNodeyCoordinates))
//               console.log(distances)
//             } else {
//               console.log("CHECK FAILED: " + coordinateToString(futureNodeyCoordinates))
//               console.log(distances)
//               distances.set(coordinateToString(futureNodeyCoordinates), distance-1)
//             }
//             if(!visitedNodes.includes(coordinateToString(futureNodeyCoordinates))){
//               console.log("Visited node check is happening")
//               if((shortestCoordinate.distance > distance) || Object.keys(shortestCoordinate).length == 0) {
//                 shortestCoordinate.distance = distance
//                 shortestCoordinate.coordinate = futureNodeyCoordinates
//               }
//             }
//           }
//         }
//         console.log('shortestCoordinate in between: ')
//         console.log(shortestCoordinate)
//         console.log(distances)
//       }
//     }
//     console.log("Shortest coordinate at the end: ")
//     console.log(shortestCoordinate)
//     curPosition = shortestCoordinate.coordinate
//     console.log(visitedNodes)
//   }
  

//   return distances
// }

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
  const input = { heightMap: parseInput(rawInput), ...StartEndPos }
  
  let heightMap = input.heightMap;

let endPos = input.endPos;
let startPos = input.startPos;

let visited = heightMap.map((line) => line.map(() => false));
let shortestPaths = heightMap.map((line) => line.map(() => Infinity));
shortestPaths[endPos.y][endPos.x] = 0;

let queue = [endPos];

while (queue.length > 0) {
  let pos = queue.shift();
  visited[pos.y][pos.x] = true;

  let neighbours = [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
  ];

  neighbours = neighbours.filter((neighbour) => {
    return heightMap[neighbour.y]?.[neighbour.x] !== undefined;
  });

  neighbours.forEach((neighbour) => {
    let currHeight = heightMap[pos.y][pos.x];
    let nextHeight = heightMap[neighbour.y][neighbour.x];
    if (currHeight >= nextHeight - 1) {
      let shortestDist = shortestPaths[neighbour.y][neighbour.x] + 1;
      let currShortestDist = shortestPaths[pos.y][pos.x];
      shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
    }

    if (!visited[neighbour.y][neighbour.x] && currHeight <= nextHeight + 1) {
      queue.push(neighbour);
      visited[neighbour.y][neighbour.x] = true;
    }
  });
}

  return shortestPaths[startPos.y][startPos.x]
}

const part2 = (rawInput) => {
  const input = { heightMap: parseInput(rawInput), ...StartEndPos }

let heightMap = input.heightMap;
let endPos = input.endPos;

let visited = heightMap.map((line) => line.map(() => false));
let shortestPaths = heightMap.map((line) => line.map(() => Infinity));
shortestPaths[endPos.y][endPos.x] = 0;

let queue = [endPos];

while (queue.length > 0) {
  let pos = queue.shift();
  visited[pos.y][pos.x] = true;

  let neighbours = [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
  ];

  neighbours = neighbours.filter((neighbour) => {
    return heightMap[neighbour.y]?.[neighbour.x] !== undefined;
  });

  neighbours.forEach((neighbour) => {
    let currHeight = heightMap[pos.y][pos.x];
    let nextHeight = heightMap[neighbour.y][neighbour.x];
    if (currHeight >= nextHeight - 1) {
      let shortestDist = shortestPaths[neighbour.y][neighbour.x] + 1;
      let currShortestDist = shortestPaths[pos.y][pos.x];
      shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
    }

    if (!visited[neighbour.y][neighbour.x] && currHeight <= nextHeight + 1) {
      queue.push(neighbour);
      visited[neighbour.y][neighbour.x] = true;
    }
  });
}

let min = Infinity;

heightMap.forEach((line, y) => {
  line.forEach((height, x) => {
    if (height === 97) min = Math.min(min, shortestPaths[y][x]);
  });
});

  return min
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
