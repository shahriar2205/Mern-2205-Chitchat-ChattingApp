import React, { useEffect, useState } from 'react'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi'

import Group1 from '../../../Photo/Group1.png'
import Group2 from '../../../Photo/Group2.png'
import Group3 from '../../../Photo/Group3.png'
import SubHeading from '../SubHeading'
import Flex from '../../../Flex'
import Image from '../../../Image'
import Medium from '../Medium'
import Btn from '../Btn'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'



const FriendsRequest = ({ className }) => {
   const data = useSelector(state => state.userLoginInfo.userInfo)
   const [friedRequestList, setfriedrequestList] = useState([])
   const [userList, setuserList] = useState([])

   const db = getDatabase();
   useEffect(() => {
      const friendRequestRef = ref(db, 'friendrequest/');
      onValue(friendRequestRef, (snapshot) => {
         let arr = []
         snapshot.forEach((item) => {
            if (data.uid === item.val().receiverid) {
               arr.push({ ...item.val(), id: item.key });
            }
         })

         setfriedrequestList(arr)
      })

   }, [])
   //     useEffect(() => {
   //     const userRef = ref(db, 'users/');
   //     onValue(userRef, (snapshot) => {
   //       let arr = []
   //       snapshot.forEach(item => {
   //          if (data.uid != item.key) {
   //             arr.push({ ...item.val(), userid: item.key });
   //           }

   //       })
   //       setuserList(arr)
   //     });
   //   }, [])

   const handleFriendList = (item) => {
      set(push(ref(db, 'friend/')), {
         ...item
      }).then(() => {
         remove((ref(db, 'friendrequest/' + item.id)))
         // remove(( ref(db,'users/'+item.id)))
      })
   }


   return (
      <section className={`${className} GroupPart `} >
         <div>
            <div className='py-4 shadow-shadow px-3 mt-4 rounded-xl overflow-y-scroll h-[300px]'>
               <Flex className=' justify-between'>
                  <SubHeading text='Friend  Request ' className=' text-signBtn' />
                  <PiDotsThreeOutlineVerticalDuotone className='mt-1 text-signBtn' />
               </Flex>

               <div>
                  {
                     friedRequestList.map((item, index) => {
                        return <div key={index}>
                           <Flex className=' mt-5 justify-between '>
                              <Flex>
                                 <Image src={Group1} alt={Group1} className="w-[80px] h-[80px] rounded-full" />
                                 <div className=' mt-3 ml-4'>
                                    <SubHeading text={item.sendername} className=' text-lg' />
                                    <Medium text="Hi Guys, Wassup!" className=' text-sm' />
                                 </div>
                              </Flex>
                              <div className='mt-4' onClick={() => handleFriendList(item)}>
                                 <Btn text='Accept' className=' h-9 my-auto ' />
                              </div>
                           </Flex>
                           <div className='border mt-4'></div>
                        </div>
                     })
                  }
               </div>
            </div>
         </div>
      </section>
   )
}

export default FriendsRequest

