
const rowWrapper = (board, rowPos, callBack) => {
  const row = board[rowPos];
  return callBack(row);
}

const colWrapper = (board, colPos, callBack) => {
  const length = board.length;
  const col = new Array(length);
  for (let i = 0; i < length; i++) {
    col.push(board[i][colPos]);
  }
  return callBack(col);
}
const squareWrapper = (board, rowPos, colPos, callBack) => {
  const size = Math.sqrt(board.length);

  function getSeqmentArray(pos) {
    const seq = Math.floor(pos / size);
    const res = [];
    for (let i = 0; i < size; i++) {
      res.push(seq * size + i);
    }
    return res;
  }

  const arrTobeValidated = [];
  const rowNos = getSeqmentArray(rowPos);
  const colNos = getSeqmentArray(colPos);
  for (let r of rowNos) {
    for (let c of colNos) {
      arrTobeValidated.push(board[r][c]);
    }
  }
  return callBack(arrTobeValidated);
}


const isCombinationValid = (arr) => {
  const filtered = arr.filter(x => x !== null);
  const set = new Set(filtered);
  return filtered.length === set.size;
}

const getNumberOfCellsHasValue = (arr) =>{
  return arr.filter((x, i) => x).length;
}

const isRowValid = (board, rowPos) => {
  return rowWrapper(board, rowPos, isCombinationValid)
}

const isColValid = (board, colPos) => {
  
  return colWrapper(board, colPos, isCombinationValid);
}

const isSquareValid = (board, rowPos, colPos) =>{
  return squareWrapper(board, rowPos, colPos, isCombinationValid);
}

const getRowFilledCount = (board, rowPos) =>{
  return rowWrapper(board, rowPos, getNumberOfCellsHasValue);
}

const getColFilledCount = (board, colPos) =>{
  return colWrapper(board, colPos, getNumberOfCellsHasValue);
}

const getSquareFilledCount = (board, rowPos, colPos) =>{
  return squareWrapper(board, rowPos, colPos, getNumberOfCellsHasValue);
}


export const getEmptyCells = (board) => {
  const res = new Array(0);

  const rowSeqenceDict = board.map((row, rowIndex) => {
    return {
      index: rowIndex,
      count: row.filter((col) => col).length
    }
  }).sort((a, b) => b.count - a.count);

  const length = board.length;
  for (let i = 0; i < length; i++) {
    const rowIndex = rowSeqenceDict[i].index;
    for (let j = 0; j < length; j++) {
      if (board[rowIndex][j] === null) {
        res.push([rowIndex, j])
      }
    }
  }
  return res;
}

const getNextEmptyCell= (board) =>{
  const length = board.length;
  const arr = [];
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (board[i][j] === null) {
        arr.push([i, j])
      }
    }
  }
  if(!arr.length){
    return null;
  }
  const weightedArr = arr.map(x => {
    return {pos: x, score: getRowFilledCount(board, x[0]) + getColFilledCount(board, x[1]) + getSquareFilledCount(board, x[0], x[1]) }
  }).sort((a, b) => b.score - a.score);
  return weightedArr[0];
}


export const isBoardValid = (board)=>{
  for(let i = 0; i < board.length; i++){
    if(!isRowValid(board, i))
      return false;
    if(!isColValid(board, i))
      return false;
  }
  for(let i = 0; i < board.length; i+=3){
    for(let j = 0; j < board.length; j+=3){
      if(!isSquareValid(board, i, j))
        return false;
    }
  }
  return true;
}

export const fillFirstRow = (board) => {
  const length = board.length;
  for (let i = 0; i < length; i++) {
    board[0][i] = i + 1;
  }
  return board;
}

export const solver = (board) => {
  function nextValue(value){
    if (value === null)
      return 1;
    return value + 1;
  }

  const length = board.length;

  const emptyCells = getEmptyCells(board);
  let cur = 0;
  while (cur < emptyCells.length) {

    if (cur < 0) {
      throw new Error("No Solution");
    }

    const row = emptyCells[cur][0];
    const col = emptyCells[cur][1];

    let v = nextValue(board[row][col])
    while (v < length + 1) {
      board[row][col] = v;
      if (isRowValid(board, row) && isColValid(board, col) && isSquareValid(board, row, col)) {
        break;
      }
      v = nextValue(board[row][col])
    }
    if (v > length) {
      board[row][col] = null;
      cur--;

    } else {
      cur++;
    }

  }
  return board;
}

export const getNumberCellsCount = (board) => {
  return board.reduce((res, row)=>{
    return res + row.filter(col => col).length
  }, 0)
}

// backtracking - solve by row has highest filled counts first
function* solverGenerator(board){
  function nextValue(value){
    if (value === null)
      return 1;
    return value + 1;
  }

  const length = board.length;

  const emptyCells = getEmptyCells(board);
  let cur = 0;
  while (cur < emptyCells.length) {
    yield board;
    if (cur < 0) {
      throw new Error("No Solution");
    }

    const row = emptyCells[cur][0];
    const col = emptyCells[cur][1];

    let v = nextValue(board[row][col])
    while (v < length + 1) {
      board[row][col] = v;
      if (isRowValid(board, row) && isColValid(board, col) && isSquareValid(board, row, col)) {
        break;
      }
      v = nextValue(board[row][col])
    }
    if (v > length) {
      board[row][col] = null;
      cur--;

    } else {
      cur++;
    }

  }
  return board;
}


// backtracking - solve by finding the next empty cells with the highest score first
function* solver2Generator(board){
  function nextValue(value){
    if (value === null)
      return 1;
    return value + 1;
  }

  const length = board.length;

  const emptyCells = [];
  let nextEmptyCell = getNextEmptyCell(board);
  // emptyCells.push(nextEmptyCell);
  while (nextEmptyCell) {
    
    // if (!emptyCells.length) {
    //   throw new Error("No Solution");
    // }

    const row = nextEmptyCell.pos[0];
    const col = nextEmptyCell.pos[1];

    let v = nextValue(board[row][col])
    while (v < length + 1) {
      board[row][col] = v;
      if (isRowValid(board, row) && isColValid(board, col) && isSquareValid(board, row, col)) {
        break;
      }
      v = nextValue(board[row][col])
    }
    if (v > length) {
      board[row][col] = null;
      nextEmptyCell = emptyCells.pop();

    } else {
      nextEmptyCell = getNextEmptyCell(board);
      emptyCells.push({pos:[row, col]})
    }
    yield board;

  }
  return board;
}

export const getEmptyBoard= ()=>{
  return new Array(9).fill(0).map(() => new Array(9).fill(null))
}

export {solverGenerator, solver2Generator}