import React, { useState } from 'react'
import Flex from '../../../Flex'
import SubHeading from '../SubHeading'
import {PiDotsThreeOutlineVerticalDuotone} from 'react-icons/pi'
import Image from '../../../Image'
import Medium from '../Medium'
import Friend1 from '../../../Photo/Friend1.png'
import { useEffect } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSelector } from 'react-redux'
function Block({className}) {
    const data = useSelector(state => state.userLoginInfo.userInfo)


    const [showBlock,setshowBlock]=useState([])
    const db = getDatabase();

    useEffect(()=>{
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
          let arr=[]
      snapshot.forEach((item)=>{
        if(item.val().blockbyid==data.uid){
          arr.push({
            block:item.val().block,
            blockid:item.val().blockid,
            // id:item.val().id
            id:item.key
          })
        }
        else {
          arr.push({
            blockby:item.val().blockby,
            blockbyid:item.val().blockbyid,
            // id:item.val().id
            id:item.key
          })
        }
      })
      setshowBlock(arr)
      });
    },[])
   
  
    
  return (
    <>
       <section className={` ${className}`}>


<div className='mt-7 py-4 pb-9 shadow-shadow px-7 rounded-xl overflow-y-scroll h-[310px]'>
  <Flex className=' justify-between'>
    <SubHeading text='Block List' className=' text-signBtn' />
    <PiDotsThreeOutlineVerticalDuotone className='mt-1 text-signBtn' />
  </Flex >
  <div>
        <div>
           {
            showBlock.map((item)=>{
             return <div>
              <Flex className=' mt-5 justify-between'>
           <Flex className='gap-x-5'>
             <Image src={Friend1} alt={Friend1} />
             <div className=' mt-2 '>
             <SubHeading  text={item.block} />
             <SubHeading  text={item.blockby} />
               <Medium text='Today, 8:56pm?' className=' text-xs' />
             </div>
           </Flex>
           <div className=' mt-2 '>                         
     <button onClick={(()=>handleUnblock(item))} className=' px-4 py-1 bg-signBtn text-white rounded-lg text-xl'>Unblock</button>
           </div>
         </Flex>
         <div className='border  mt-2'></div>
           </div>
            })
           }
                   
          
        </div>
  
 



  </div>



</div>
</section>
    </>
  )
}

export default Block
