import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {getEmptyBoard, solver2Generator, getNumberCellsCount, isBoardValid} from '../services/sudokuGen'
import './Board.scss'
import BoardCell from './BoardCell';
import Counter from './Counter'

const Board = () => {

  const [board, setBoard] = useState(getEmptyBoard())

  const [speed, setSpeed] = useState(30);

  const boardEl = useRef(null)

  const [IsGenerating, setIsGenerating] = useState(false)

  const [activeCell, setActiveCell] = useState([null, null]);

  const [myInterval, setMyInterval] = useState(null)

  const [count, setCount] = useState(0);

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
    function clearActive(e){
      if(!boardEl.current.contains(e.target)){
        setActiveCell([null, null])
      }
    }
    document.body.addEventListener('click', clearActive);

    return (()=>document.body.removeEventListener('click', clearActive))
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
  }, [activeCell])

  const onGenerate = ()=>{
    
    if(!isBoardValid(board)){
      alert("I can't solve the impossible#!@#!@$");
      return;
    }

    setActiveCell([null, null])
    function startSolving(){
      const newBoard = JSON.parse(JSON.stringify(board));
      
        setIsGenerating(true)
        const generator = solver2Generator(newBoard);
        const interval = setInterval(()=>{
          try{
          const next = generator.next();
          setBoard(JSON.parse(JSON.stringify(next.value)))
          setCount(count=>count+1);
          if(next.done){
            clearInterval(interval);
            setMyInterval(null)
          }
        }catch{
          alert("????");
          clearInterval(interval);
          setMyInterval(null)
        }
      }, speed)
      setMyInterval(interval)
    }

    if(getNumberCellsCount(board) < 17){
      // if(window.confirm(`If less than 17, there maybe more than 1 unqiue solutions` )){
        startSolving();
      // }
      
    }else{
      startSolving();
    }
    
  }

  const onReset = () =>{
    if(myInterval){
      clearInterval(myInterval);
      setMyInterval(null)
    }
    setCount(0)
    setIsGenerating(false)
    setBoard(getEmptyBoard())
  }

  function isActiveCell(rowIndex, colIndex){
    return (rowIndex === activeCell[0] && colIndex === activeCell[1])
  }

  return (<div className="ui four column centered grid" style={{marginTop:'15px'}}>
    <div class="ui right labeled input">
      <label for="speed" class="ui label">Speed</label>
      <input type="number" placeholder="Amount" id="speed" value={speed} min="1" max="5000" onChange={(e)=>setSpeed(+e.target.value)} disabled={IsGenerating}/>
      <div class="ui basic label">ms</div>
    </div>
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
                                                    isDisable={IsGenerating}
                                                  />)}
            </div>)
        })}
      </div>
    </div>
    <div className="">
    <Counter count={count}/>
      <button className="ui button" onClick={onGenerate} disabled={IsGenerating}>Generate</button>
      <button className="ui button" onClick={onReset}>Reset</button>
      
    </div>
  </div>)
}


export default Board