import React from 'react'

function Btn({text,className}) {
  return (
   <button className={` px-7 rounded-lg bg-signBtn text-white ${className}`}>{text}</button>
  )
}

export default Btn
