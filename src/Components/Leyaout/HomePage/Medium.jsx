import React from 'react'

function Medium({className,text}) {
  return (
    <h3 className={`font-pop text-sm font-medium text-[#4D4D4D] opacity-[75%] ${className} `}>{text}</h3>
  )
}

export default Medium
