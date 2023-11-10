import React, { useState } from 'react'
import {PiDotsThreeOutlineVerticalDuotone} from 'react-icons/pi'
import {RiSearchLine} from 'react-icons/ri'
import SubHeading from '../SubHeading'
import Flex from '../../../Flex'
import Group1 from '../../../Photo/Group1.png'
import Group2 from '../../../Photo/Group2.png'
import Group3 from '../../../Photo/Group3.png'
import Medium from '../Medium'
import Image from '../../../Image'
import Btn from '../Btn'
import {AiOutlineClose} from 'react-icons/ai'
const Group = ({className,midText,subText,src}) => {
   const [show,setshow]=useState(false)
   const handleShowOf=()=>{
      setshow(!show)
   }
   const handleCancel=()=>{
      setshow(false)
   }
  return (
   <section className={`${className} GroupPart `} >
       
    <div>
      <div className='py-4 shadow-shadow px-3 mt-4 rounded-xl overflow-y-scroll h-[300px]'>
        <Flex className=' justify-between'>
      <SubHeading text='Groups List '  className=' text-signBtn' />
      <PiDotsThreeOutlineVerticalDuotone className='mt-1 text-signBtn' />
      </Flex>
      <h2  onClick={handleShowOf}>cool</h2>

    {
      show ?
      <div className=' bg-[#a8c7fc] py-3 relative'>
      <Flex className=" justify-between items-center text-gray-700">
         <h3 className=' mx-auto text-[25px] font-lob'>Create Group</h3>
         <AiOutlineClose onClick={handleCancel}  className=' absolute top-0  right-1 rounded-full px-2 py-1 bg-white text-black text-[30px]'/>
      </Flex>
      <div className=' mt-4 text-center '>
         <input type=" text"  placeholder='Group Name' className=' px-7 py-1 w-72 outline-none border-4' />
         <input type=" text"  placeholder='Group Tag Name' className=' px-7 py-1 mt-4 w-72 outline-none border-2' />
      </div>
         <button className='text-center flex mx-auto py-1 px-3 mt-3 bg-green-600 rounded-md'>Create Group</button>
    </div> 
    :
    <div>
    <Flex className=' mt-5 justify-between '>
     <Flex>
    <Image src={Group1} alt={Group1} />
    <div className=' mt-2 ml-4'>
    <SubHeading text='Friends Reunion' className=' text-lg' />
    <Medium text="Hi Guys, Wassup!" className=' text-sm' />
    </div>
   </Flex>
    <Btn text='Join' className=' h-9 my-auto '  />
    </Flex> 
    <div className='border mt-4'></div>
   </div>

    }
        
        
 
          
          </div>        
    </div>
   </section>
  )
}

export default Group
