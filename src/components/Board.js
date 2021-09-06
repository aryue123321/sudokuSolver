import React from 'react';
import { useState } from 'react';
import {getEmptyBoard, solver} from '../services/sudokuGen'
import './Board.scss'
import BoardCell from './BoardCell';

const Board = () => {

  const [board, setBoard] = useState(getEmptyBoard())

  const onCellValueChanged = (rowIndex, colIndex, value) =>{
    return function(value){
      value = +value;
      const newBoard = JSON.parse(JSON.stringify(board));
      if(value >= 1 && value <= 9){
        newBoard[rowIndex][colIndex] = +value;
        
        setBoard(newBoard);
      }else{
        newBoard[rowIndex][colIndex] = null;
        setBoard(newBoard);
      }
    }
  }

  const onGenerate = ()=>{
    const newBoard = JSON.parse(JSON.stringify(board));
    const result = solver(newBoard);
   setBoard(result)
  }

  return (<div>
      <div className="board">
      {board.map((row, rowIndex)=>{
        return (<div key={rowIndex} className="board-row">
          {row.map((col, colIndex) => <BoardCell key={colIndex} value={col} onCellValueChanged={onCellValueChanged(rowIndex, colIndex)}/>)}
          </div>)
      })}
    </div>
    <button onClick={onGenerate}>Generate</button>
  </div>)
}


export default Board