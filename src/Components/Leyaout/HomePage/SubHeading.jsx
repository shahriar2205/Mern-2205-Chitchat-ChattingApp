import React from 'react'

function SubHeading({className,text}) {
  return (
   <h2 className={`font-pop text-xl font-semibold text-[#000000] ${className} `}>{text}</h2>
  )
}

export default SubHeading
