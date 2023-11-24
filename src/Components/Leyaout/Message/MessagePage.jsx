import React, { useState } from 'react'
import SideBar from '../HomePage/SideBar'
import Flex from '../../Flex'
import { RiSearchLine } from 'react-icons/ri'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi'
import MyGroup from '../HomePage/MyGroupPart/MyGroup'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { RotatingLines } from 'react-loader-spinner'
import { userLoginInfo } from '../../Slices/userSlice'
import msg from "../../Photo/msg.png"
import MessageFriends from '../MessageFriend/MessageFriends'
import Chat from '../../Chat/Chat'
function MessagePage({ active }) {
  const [loading, setloading] = useState(true)
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const dispatch = useDispatch()


  const [verify, setverify] = useState(false)
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setverify(true)
    }
    setloading(false)
    dispatch(userLoginInfo(user));
    localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
  });
  return (
    <section className={`message `}>
      {
        loading ? (
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
              <SideBar active="Messages" />
            </div>
            <Flex className=" gap-x-14 ml-7 ">
              <Flex className="flex-col w-[400px]">
                <MessageFriends friendsClass="h-[340px]" className="mt-5" />
                <MyGroup />
              </Flex>
              <Chat className="h-[600px]"/>
            </Flex>

          </Flex>
      }
    </section>
  )
}

export default MessagePage
