import React from 'react'

function TimeText({className,text}) {
  return (
    <div>
      <h3 className={`font-pop text-[10px] mt-5 font-medium text-[#4D4D4D] opacity-[75%] ${className} `}>{text}</h3>
    </div>
  )
}

export default TimeText
