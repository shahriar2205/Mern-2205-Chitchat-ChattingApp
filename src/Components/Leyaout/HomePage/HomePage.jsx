import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Flex from '../../Flex';
import SideBar from './SideBar';
import Group from './GroupList/Group';
import Friends from './FriendList/Friends';
import { RiSearchLine } from 'react-icons/ri';
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from '../../Image';
import email from '../../Photo/email.jpg'
import {FaRegHandPointDown} from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation';
import Btn from './Btn';
import { userLoginInfo } from '../../Slices/userSlice';
import User from './UserList/User';
import FriendsRequest from './FriendRequest/FriendsRequest';
import { RotatingLines } from 'react-loader-spinner'
import Block from './BlockPart/Block';
import MyGroup from './MyGroupPart/MyGroup';
function HomePage({active}) {
  const dispatch=useDispatch()
  const data=useSelector(state=>state.userLoginInfo.userInfo)
  const navigate = useNavigate();
  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  })
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

 const handleClick=()=>{
  navigate('/login')
 }
 const [loading,setloading]=useState(true)
  return (      

  <section>
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
      verify && data ?
      (
        <Flex className=' px-5 py-2 gap-x-8'>

            <div className='w-[150px]'>
          <SideBar active="Home" />
          </div> 

     <Flex className=" gap-x-16">
     <div className=' w-[427px] '>
         <div className='relative'>
         <input type="text" placeholder='search' className=' w-full px-24 py-3 shadow-shadow rounded-lg outline-none ' />
         <RiSearchLine className='absolute top-4 text-signBtn  left-3'/>
         <PiDotsThreeOutlineVerticalDuotone className='absolute top-4 right-3 text-signBtn'/>
         </div>
           <Group className=" " />
        <FriendsRequest className=" mt-10 " />
           </div> 

      <div className=' w-[380px]'>
     <Friends /> 
     <MyGroup/>
     </div>
      
      <div className=' w-[380px] '>
     <User /> 
     <Block/>
      </div>
     </Flex>

       </Flex>
      )
       :

    (
      <div className='h-screen '>
     
       <div className='mx-auto  items-center text-center pt-24 group '>
        <h2 className=' text-5xl text-[#777]'>Verify Your Email</h2>
        <h2 className='text-[#777] mt-5 text-3xl group-hover:text-signBtn duration-300 '>
        Cheak your email & click the link-
        <TypeAnimation
      sequence={[
       
       
        
        '  to active  your account',
        1000,
         ' to active  your account',
        1000,
       
      ]}
      wrapper="span"
      speed={30}
      style={{ fontSize: '1em', display: 'inline-block' }}
      repeat={Infinity}
    />
        </h2>
      <div className='relative'>
      <Image src={email} alt={email} className=' mx-auto w-[600px] h-[400px]'  >
        </Image>
        <FaRegHandPointDown className=' text-red-900 duration-500  text-3xl group-hover:text-signBtn absolute top-[93%] left-[50%]' />
       
      </div>
    <div onClick={handleClick}>
    <Btn text='Back to Login' className=" py-2 mt-3 mx-auto hover:bg-black hover:text-white duration-500" />
      </div>
       </div>
    </div>
    )
    }

   
  </section>
  )
}

export default HomePage