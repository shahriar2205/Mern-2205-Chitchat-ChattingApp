import React, { useEffect, useRef, useState } from 'react'
import Flex from '../../../Flex'
import SubHeading from '../SubHeading'
import Medium from '../Medium'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi'
import Friend1 from '../../../Photo/Friend1.png'
import Friend2 from '../../../Photo/Friend2.png'
import Friend3 from '../../../Photo/Friend3.png'
import Friend4 from '../../../Photo/Friend4.png'
import user1 from "../../../Photo/User1.png"
import { BiPlusMedical } from 'react-icons/bi'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import Image from '../../../Image'
import { useSelector } from 'react-redux'
import { BsThreeDots } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'

function User({ className }) {
  const data = useSelector(state => state.userLoginInfo.userInfo)

  const [userData, setuserList] = useState([])
  const [friendrequest, setfriendrequest] = useState([])
  const [friendAccept, setfriendAccept] = useState([])
  const [friendBlock, setfriendBlock] = useState([])
  const db = getDatabase();
  const [Usersearch,setUserSearch]=useState([]);


  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (data.uid != item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      })
      setuserList(arr)
    });
  }, [])

  const handleFriendRequest = (item) => {
    set(push(ref(db, 'friendrequest/')), {
      sendername: data.displayName,
      senderid: data.uid,
      receivername: item.username,
      receiverid: item.userid,
    });
  }

  useEffect(() => {
    const friendRequest = ref(db, 'friendrequest/');
    onValue(friendRequest, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        arr.push(item.val().senderid + item.val().receiverid);
      })
      setfriendrequest(arr);
    })
  }, [])

  useEffect(() => {
    const friendAcceptList = ref(db, 'friend/');
    onValue(friendAcceptList, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        arr.push(item.val().senderid + item.val().receiverid)
      })
      setfriendAccept(arr)
    })
  }, [])  
  
  useEffect(() => {
    const blockFriend = ref(db, 'block/');
    onValue(blockFriend, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        console.log(item.val());
        arr.push(item.val().blockid + item.val().blockbyid)
      })
      setfriendBlock(arr)
    })
  }, [])
 
const handleUsersSearch=((e)=>{    
  let arr=[];
  userData.filter((item)=>{
if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
  arr.push(item)
  setUserSearch(arr)
}
  })
})
  return (
    <>

      <section className={` ${className}`}>

      <div className='relative'>
         <input onChange={handleUsersSearch}  type="text" placeholder='search' className='w-full px-24 py-3 shadow-shadow rounded-lg outline-none ' />
         <RiSearchLine className='absolute top-4 text-signBtn  left-3'/>
         <PiDotsThreeOutlineVerticalDuotone className='absolute top-4 right-3 text-signBtn'/>
         </div>


        <div className='pt-4 mt-3 pb-9 shadow-shadow px-7 rounded-xl overflow-y-scroll  h-[300px]'>
          <Flex className=' justify-between'>
            <SubHeading text='User List' className=' text-signBtn' />
            <PiDotsThreeOutlineVerticalDuotone className='mt-1 text-signBtn' />
          </Flex >

          

          <div className='relative'>
            <div>
             {
              Usersearch.length>0
               ?
              Usersearch.map((item, index) => (
                <div key={index} className=''>
                  <Flex className=' mt-5 justify-between '>
                    <Flex className='gap-x-5'>
                      <Image src={Friend1} alt={Friend1} />
                      <div className=' mt-2 '>
                        <SubHeading text={item.username} className=' text-lg' />
                        <Medium text='Today, 8:56pm?' className=' text-xs' />
                      </div>
                    </Flex>
                    <div className='mt-2 '>
                      {
                        friendAccept.includes(data.uid + item.userid)
                          ||
                          friendAccept.includes(item.userid + data.uid)
                          ?
               <BsThreeDots className='bg-gray-200 hover:bg-gray-500 w-10 h-10  rounded-full px-2  hover:text-white duration-500'/>
                          :
                          friendrequest.includes(data.uid + item.userid)
                            ||
                            friendrequest.includes(item.userid + data.uid)
                            ?
                            <button className=' px-4 py-1 bg-signBtn text-white rounded-lg text-xl'>Pending</button>
                            :
                            friendBlock.includes(data.uid+item.userid) || 
                            friendBlock.includes(item.userid+data.uid)
                            ?
                            <button  className=' px-1 py-1 bg-red-600 text-white rounded-lg text-xl'>Blocked🤧</button>
                            :
                            <button onClick={() => handleFriendRequest(item)} className=' px-4 py-1 bg-signBtn text-white rounded-lg text-xl'>Add 👉</button>

                      }

                    </div>
                  </Flex>
                  <div className='border  mt-2'></div>
                </div>
              )
              )
              :
              userData.map((item, index) => (
                <div key={index} className=''>
                  <Flex className=' mt-5 justify-between '>
                    <Flex className='gap-x-5'>
                      <Image src={Friend1} alt={Friend1} />
                      <div className=' mt-2 '>
                        <SubHeading text={item.username} className=' text-lg' />
                        <Medium text='Today, 8:56pm?' className=' text-xs' />
                      </div>
                    </Flex>
                    <div className='mt-2 '>
                      {
                        friendAccept.includes(data.uid + item.userid)
                          ||
                          friendAccept.includes(item.userid + data.uid)
                          ?
               <BsThreeDots className='bg-gray-200 hover:bg-gray-500 w-10 h-10  rounded-full px-2  hover:text-white duration-500'/>
                          :
                          friendrequest.includes(data.uid + item.userid)
                            ||
                            friendrequest.includes(item.userid + data.uid)
                            ?
                            <button className=' px-4 py-1 bg-signBtn text-white rounded-lg text-xl'>Pending</button>
                            :
                            friendBlock.includes(data.uid+item.userid) || 
                            friendBlock.includes(item.userid+data.uid)
                            ?
                            <button  className=' px-1 py-1 bg-red-600 text-white rounded-lg text-xl'>Blocked🤧</button>
                            :
                            <button onClick={() => handleFriendRequest(item)} className=' px-4 py-1 bg-signBtn text-white rounded-lg text-xl'>Add 👉</button>

                      }

                    </div>
                  </Flex>
                  <div className='border  mt-2'></div>
                </div>
              )
              )
             }
            
               
             
           
           
             
          
 </div>

          </div>



        </div>
      </section>
    </>
  )
}

export default User
