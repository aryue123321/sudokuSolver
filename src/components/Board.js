import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {getEmptyBoard, solverGenerator, getNumberCellsCount} from '../services/sudokuGen'
import './Board.scss'
import BoardCell from './BoardCell';

const Board = () => {

  const [board, setBoard] = useState(getEmptyBoard())

  const boardEl = useRef(null)

  const [resultShow, setResultShow] = useState(false)

  const [activeCell, setActiveCell] = useState([null, null]);

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

  useEffect(() => {
    document.body.addEventListener('click', (e) =>{
      if(!boardEl.current.contains(e.target)){
        setActiveCell([null, null])
      }
    });
  }, [])

  useEffect(() => {
    function activeCellListenser(e){
      function setActiveCallIfValid(newCell){
        if(newCell[0] >= 0 && newCell[0] <= 8 && newCell[1] >= 0 && newCell[1] <= 8){
          setActiveCell(newCell)
        }
      }
      if(e.code === 'ArrowDown'){
        const newActiveCell = [ activeCell[0]+1, activeCell[1] ]
        setActiveCallIfValid(newActiveCell)
      }
      if(e.code === 'ArrowUp'){
        const newActiveCell = [ activeCell[0]-1, activeCell[1] ]
        setActiveCallIfValid(newActiveCell)
      }
      if(e.code === 'ArrowRight'){
        const newActiveCell = [ activeCell[0], activeCell[1]+1 ]
        setActiveCallIfValid(newActiveCell)
      }
      if(e.code === 'ArrowLeft'){
        const newActiveCell = [ activeCell[0], activeCell[1]-1 ]
        setActiveCallIfValid(newActiveCell)
      }
    }
    const el = boardEl.current;
    el.addEventListener('keydown', activeCellListenser);

    return (()=> el.removeEventListener('keydown', activeCellListenser));
  })

  const onGenerate = ()=>{
    setActiveCell([null, null])
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

  function isActiveCell(rowIndex, colIndex){
    return (rowIndex === activeCell[0] && colIndex === activeCell[1])
  }

  return (<div className="ui four column centered grid">
    <div className="two column row">
        <div className="board" ref={boardEl}>
        {board.map((row, rowIndex)=>{
          return (<div key={rowIndex} className="board-row">
            {row.map((col, colIndex) => <BoardCell  key={colIndex} 
                                                    value={col} 
                                                    onCellValueChanged={onCellValueChanged(rowIndex, colIndex)} 
                                                    isActive={isActiveCell(rowIndex, colIndex)} 
                                                    onSetActive={()=>setActiveCell([rowIndex, colIndex])}
                                                    onSetNoActive={()=>setActiveCell([null, null])}
                                                  />)}
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