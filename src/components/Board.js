import React from 'react';
import { useState } from 'react';
import {getEmptyBoard, solver} from '../services/sudokuGen'
import './Board.scss'
import BoardCell from './BoardCell';

const Board = () => {

  const [board, setBoard] = useState(getEmptyBoard())

  const [resultShow, setResultShow] = useState(false)

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
    try{
      const result = solver(newBoard);

      setResultShow(true)
      setBoard(result)
    }catch{
      alert("I can't solve the impossible#!@#!@$")
    }
  }

  const onReset = () =>{
    setResultShow(false)
    setBoard(getEmptyBoard())
  }

  return (<div className="ui four column centered grid">
    <div className="two column row">
        <div className="board">
        {board.map((row, rowIndex)=>{
          return (<div key={rowIndex} className="board-row">
            {row.map((col, colIndex) => <BoardCell key={colIndex} value={col} onCellValueChanged={onCellValueChanged(rowIndex, colIndex)}/>)}
            </div>)
        })}
      </div>
    </div>
    <div className="">
      <button className="ui button" onClick={onGenerate} disabled={resultShow}>Generate</button>
      <button className="ui button" onClick={onReset}>Reset</button>
    </div>
  </div>)
}


export default Board