import React, { useState } from 'react'
import SideBar from '../HomePage/SideBar'
import Flex from '../../Flex'
import {RiSearchLine} from 'react-icons/ri'
import {PiDotsThreeOutlineVerticalDuotone} from 'react-icons/pi'
import Friends from '../HomePage/FriendList/Friends'
import MyGroup from '../HomePage/MyGroupPart/MyGroup'
import Group from '../HomePage/GroupList/Group'
import FriendsRequest from '../HomePage/FriendRequest/FriendsRequest'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { RotatingLines } from 'react-loader-spinner'
import { userLoginInfo } from '../../Slices/userSlice'
import User from '../HomePage/UserList/User'
import Block from '../HomePage/BlockPart/Block'

function MessagePage() {
    const [loading,setloading]=useState(true)
    const data=useSelector(state=>state.userLoginInfo.userInfo)
    const dispatch=useDispatch()
   

    const [verify,setverify]=useState(false)
    const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user.emailVerified){
      setverify(true)
     }
     setloading(false)
  dispatch(userLoginInfo(user));
  localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo(user.user)))
});
    return (
        <section className={`message `}>
            {
                  loading ?(
                    <div className="flex justify-center items-center h-screen">
                     <RotatingLines
                      strokeColor="black"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="120"
                      height="120" 
                      visible={true}
                    />
                    </div>
                  ) 
                  :
                  <Flex className=' px-5 py-2 gap-x-8'>

                  <div className='w-[150px]'>
                <SideBar />
                </div> 
                 <Flex className=" gap-x-16 ">
           <div className=''>
               <div className='relative mx-auto'>
               <input type="text" placeholder='search' className=' w-full px-24 py-3 shadow-shadow rounded-lg outline-none ' />
               <RiSearchLine className='absolute top-4 text-signBtn  left-3'/>
               <PiDotsThreeOutlineVerticalDuotone className='absolute top-4 right-3 text-signBtn'/>
               </div>
                <Friends friendsClass="h-[292px]" className="mt-5" /> 
           <MyGroup/>
                 </div> 
                 </Flex>
             <div className='chatt'>
           
             </div>
             </Flex>
            }
        </section>
    )
}

export default MessagePage
