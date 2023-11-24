import React, { useState } from 'react'
import SideBar from '../HomePage/SideBar'
import Flex from '../../Flex'
import { RiSearchLine } from 'react-icons/ri'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi'
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
import msg from "../../Photo/msg.png"
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
            <Flex className=" gap-x-16 ml-7 ">

              <Flex className="flex-col w-[400px]">
                <Friends friendsClass="h-[340px]" className="mt-5" />
                <MyGroup />
              </Flex>
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
            </Flex>

          </Flex>
      }
    </section>
  )
}

export default MessagePage
