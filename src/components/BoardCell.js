import React from 'react';
import { useState, useRef, useEffect } from 'react';



const BoardCell = ({value, onCellValueChanged}) =>{

  const [focus, setFocus] = useState(false)

  const cellEl = useRef(null);

  const onValueChanged = (e) =>{
    onCellValueChanged(e.target.value)
  }

  useEffect(()=>{
    document.body.addEventListener('click', (e)=>{
      if(cellEl.current.contains(e.target)){
        return;
      }
      setFocus(false);
    },
    {capture: true})

    document.body.addEventListener('focus', (e)=>{
      if(cellEl.current.contains(e.target)){
        setFocus(true);
      }else{
        setFocus(false);
      }
    },
    {capture: true})
  }, [])

  useEffect(()=>{
    if(focus){
      console.log(cellEl.current.querySelector('input').focus())
    }
  }, [focus])

  return <div className="board-cell" ref={cellEl} onClick={()=>setFocus(true)}>
    {focus ? <input value={value ===  null ? '' : value}  onChange={onValueChanged}/> : <button >{value === null ? <span>&nbsp;</span>: value}</button>}
  </div>
}

export default BoardCell