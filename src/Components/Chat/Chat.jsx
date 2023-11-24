import React from 'react'
import Flex from '../Flex'
import msg from '../Photo/msg.png'
import {PiDotsThreeOutlineVerticalDuotone} from 'react-icons/pi'
function Chat() {
  return (
    <div className='chatt w-[800px] '>
    <div className='shadow-shadow px-14 py-7 h-full'>
      <div>
        <Flex className=" justify-between  ">
          <Flex className="gap-x-6">
            <div className=' relative'>
              <img src={msg} alt={msg} />
              <div className=' w-4 h-4 rounded-full shadow-online bg-[#00FF75] absolute bottom-[6px] right-3'></div>
            </div>
            <div className=' mt-2'>
              <h3 className=' font-open text-2xl font-bold '>Swathi </h3>
              <p>Online</p>
            </div>
          </Flex>
          <PiDotsThreeOutlineVerticalDuotone className=' text-signBtn text-2xl mt-4  font-bold ' />
        </Flex>
        <div className=' border mt-3'></div>
      </div>
      
    </div>
  </div>
  )
}

export default Chat
