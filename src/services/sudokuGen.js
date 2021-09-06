const isCombinationValid = (arr) => {
  const filtered = arr.filter(x => x !== null);
  const set = new Set(filtered);
  return filtered.length === set.size;
}

const isRowValid = (board, rowPos) => {
  const row = board[rowPos];
  return isCombinationValid(row);
}

const isColValid = (board, colPos) => {
  const length = board.length;
  const col = new Array(length);
  for (let i = 0; i < length; i++) {
    col.push(board[i][colPos]);
  }
  return isCombinationValid(col);
}

const isSquareValid = (board, rowPos, colPos) =>{
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

  return isCombinationValid(arrTobeValidated);
}


const getEmptyCells = (board) => {
  // const b = JSON.parse(JSON.stringify(board));
  const res = new Array(0);
  const length = board.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (board[i][j] === null) {
        res.push([i, j])
      }
    }
  }
  return res;
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


export const getEmptyBoard= ()=>{
  return new Array(9).fill(new Array(9).fill(null))
}

export {solverGenerator}