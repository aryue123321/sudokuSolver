import React from 'react';
import { useState } from 'react';
import {getEmptyBoard, solverGenerator, getNumberCellsCount} from '../services/sudokuGen'
import './Board.scss'
import BoardCell from './BoardCell';

const Board = () => {

  const [board, setBoard] = useState(getEmptyBoard())

  const [resultShow, setResultShow] = useState(false)

  const [myInterval, setMyInterval] = useState(null)

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

    function startSolving(){
      const newBoard = JSON.parse(JSON.stringify(board));
      try{
        setResultShow(true)
        const generator = solverGenerator(newBoard);
        const interval = setInterval(()=>{
          const next = generator.next();
          setBoard(JSON.parse(JSON.stringify(next.value)))
          if(next.done){
            clearInterval(interval);
            setMyInterval(null)
          }
        }, 1)
        setMyInterval(interval)
      }catch{
        alert("I can't solve the impossible#!@#!@$")
      }
    }

    if(getNumberCellsCount(board) < 17){
      if(window.confirm(`If less than 17, there maybe more than 1 unqiue solutions` )){
        startSolving();
      }
      
    }else{
      startSolving();
    }
    
  }

  const onReset = () =>{
    if(myInterval){
      clearInterval(myInterval);
      setMyInterval(null)
    }
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