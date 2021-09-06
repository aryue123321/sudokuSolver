import React from 'react'

import Board from './Board'

import './App.scss'

const App = () =>{
  return <div>
  <div className="ui menu inverted">
  <div className="header item">
    Sudoku Solver
  </div>
</div>
  <div className="ui container">
    <Board/>
  </div>
  </div>
}

export default App