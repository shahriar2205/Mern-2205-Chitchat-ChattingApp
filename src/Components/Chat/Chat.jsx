import React, { useState } from 'react'
import Flex from '../Flex'
import msg from '../Photo/msg.png'
import {PiDotsThreeOutlineVerticalDuotone} from 'react-icons/pi'
import signPhoto from "../../assets/SignUpImg.png"
import "../Chat/Chat.css"
import { IoIosSend } from "react-icons/io";

function Chat({className}) {
 
  
  return (
   <section className={`${className}`}>
     <div className='chatt w-[800px]  h-[690px] shadow-shadow px-14 py-7 rounded-lg '>
    <div className=' rounded-lg   '>
   
      <div className=''>
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
        <div className=' border mt-2'></div>
      </div>
      
 
 <div className=' py-4 h-[520px]'>
 <div className=' hello  h-full overflow-x-hidden   pl-3 '>

        {/* receiver design */}
      <div className=' mt-14'>
        <div className='bg-[#F1F1F1] py-2 px-10 inline-block rounded-lg relative'>
           <h3>Hi there</h3>
           <svg
           className=' absolute bottom-[-3px] left-[-8px]' width="20" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3186 1.17537C13.1181 0.0939677 14.7356 0.0939677 15.5351 1.17537L27.0944 16.8111C28.0703 18.1312 27.1279 20 25.4861 20H2.36753C0.725776 20 -0.216681 18.1312 0.759296 16.8111L12.3186 1.17537Z" fill="#F1F1F1"/>
</svg>
        </div>
      </div>
      {/* receiver design */}

      {/* receiver photo design  */}
      <div className=' mt-7  '>
        <div className=' py-1 px-2 inline-block rounded-lg relative   bg-[#F1F1F1]   '>
           <img src={signPhoto} alt={signPhoto} className='w-[200px] ' />
           <svg
           className=' absolute bottom-[-3px] left-[-8px]  ' width="20" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3186 1.17537C13.1181 0.0939677 14.7356 0.0939677 15.5351 1.17537L27.0944 16.8111C28.0703 18.1312 27.1279 20 25.4861 20H2.36753C0.725776 20 -0.216681 18.1312 0.759296 16.8111L12.3186 1.17537Z" fill="#F1F1F1"/>
</svg>
        </div>
      </div>
      {/* receiver photo design  */}
 
 {/* sender design */}
 <div className='pr-10'> 
 <div className=' mt-2 text-right '>
        <div className=' py-2 px-10 inline-block rounded-lg relative bg-signBtn text-white'>
           <h3 >Hi there</h3>
           <svg
           className=' absolute bottom-[-2.5px] right-[-8px]' width="20" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3186 1.17537C13.1181 0.0939677 14.7356 0.0939677 15.5351 1.17537L27.0944 16.8111C28.0703 18.1312 27.1279 20 25.4861 20H2.36753C0.725776 20 -0.216681 18.1312 0.759296 16.8111L12.3186 1.17537Z" fill="#5F35F5"/>
</svg>
        </div>
      </div>
      {/* sender design */}

 
  {/* sender  photo design */}
  <div className=' mt-6 text-right '>
        <div className=' py-1 px-2 inline-block rounded-lg relative   bg-signBtn   text-white'>
           <img src={signPhoto} alt={signPhoto} className='w-[200px] ' />
           <svg
           className=' absolute bottom-[-2.5px] right-[-8px]  ' width="20" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3186 1.17537C13.1181 0.0939677 14.7356 0.0939677 15.5351 1.17537L27.0944 16.8111C28.0703 18.1312 27.1279 20 25.4861 20H2.36753C0.725776 20 -0.216681 18.1312 0.759296 16.8111L12.3186 1.17537Z" fill="#5F35F5"/>
</svg>
        </div>
      </div>
      {/* sender photo design */}
      </div>
 </div>
 <div className='border '></div>


 </div>
 <Flex className="gap-x-2 items-center ">
  <input  onChange={handleChat} type="text" className={`py-2 bg-[#F1F1F1]  px-6 rounded-xl outline-none ${inputSize ? "w-[95%]" : "w-[80%] focus:w-[95%]"}`} />
  <IoIosSend onClick={handleSend}   className=' bg-signBtn  text-4xl py-1 px-2 text-white rounded-lg' />
 </Flex>
 
      </div>

    </div>
   </section>

  )
}

export default Chat
