import React from 'react';
import { useRef, useEffect } from 'react';



const BoardCell = ({value, onCellValueChanged, isActive, onSetActive, onSetNoActive}) =>{

  // const [focus, setFocus] = useState(false)

  const cellEl = useRef(null);

  const onValueChanged = (e) =>{
    onCellValueChanged(e.target.value)
  }


  useEffect(()=>{
    if(isActive){
      cellEl.current.querySelector('input').focus()
    }
  }, [isActive])

  return <div className="board-cell" ref={cellEl} onClick={()=>onSetActive()} onFocus={()=>onSetActive()} onBlur={()=>onSetNoActive()}>
    {isActive ? <input value={value ===  null ? '' : value}  onChange={onValueChanged}/> : <button >{value === null ? <span>&nbsp;</span>: value}</button>}
  </div>
}

export default BoardCell