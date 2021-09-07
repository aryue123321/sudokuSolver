import React from "react";

import './Counter.scss'

const Counter= ({count}) =>{
  return <div className="counter">
    {count}
  </div>
}

export default Counter