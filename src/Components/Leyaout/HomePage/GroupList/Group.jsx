import React from 'react'
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
const Group = ({className,midText,subText,src}) => {
  return (
   <section className={`${className} GroupPart `} >
    <div>
        

        <div className='py-4 shadow-shadow px-3 mt-4 rounded-xl overflow-y-scroll h-[300px]'>
        <Flex className=' justify-between'>
      <SubHeading text='Groups List '  className=' text-signBtn' />
      <PiDotsThreeOutlineVerticalDuotone className='mt-1 text-signBtn' />
      </Flex>

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
        
            <div>
            <Flex className=' mt-5 justify-between '>
            <Flex>
            <Image src={Group2} alt={Group2} />
            <div className=' mt-2 ml-4'>
            <SubHeading text='Friends Forever' className=' text-lg' />
            <Medium text="Good to see you." className=' text-sm' />
            </div>
         </Flex>
            <Btn text='Join' className=' h-9 my-auto '  />
            </Flex> 
            <div className='border mt-4'></div>
         </div> 
         
          <div>
            <Flex className=' mt-5 justify-between '>
            <Flex>
            <Image src={Group3} alt={Group3} />
            <div className=' mt-2 ml-4'>
            <SubHeading text='Crazy Cousins' className=' text-lg' />
            <Medium text="What plans today?" className=' text-sm' />
            </div>
         </Flex>
            <Btn text='Join' className=' h-9 my-auto '  />
            </Flex> 
            <div className='border mt-4'></div>
         </div>
        
 
          
          </div>        
    </div>
   </section>
  )
}

export default Group
