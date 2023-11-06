import React from 'react'

function SignBtn({className,text}) {
  return (
<button className={` font-nunito text-xl font-semibold text-white bg-signBtn rounded-full border-2	 hover:bg-transparent border-signBtn hover:text-black duration-700 ${className}`}>{text}</button>
  )
}

export default SignBtn