
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi'
import Friend1 from '../../Photo/Friend1.png'
import Image from '../../Image'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Flex from '../../Flex'
import SubHeading from '../HomePage/SubHeading'
import Medium from '../HomePage/Medium'
import {activeChat} from '../../ActiveChatSlices/ActiveChatSlice'


function MessageFriends({ className,friendsClass}) {
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const [friendAccept, setfriendAccept] = useState([])
  const db = getDatabase();
 const activeFriend=useSelector(state => state.activeChat)
 console.log(activeFriend);
 const dispatch=useDispatch();

  useEffect(() => {
    const friendAcceptList = ref(db, 'friend/');
    onValue(friendAcceptList, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (data.uid === item.val().receiverid || data.uid === item.val().senderid) {
          arr.push({ ...item.val(),frId:item.key })
        }

      })
      setfriendAccept(arr)
    })
  }, [])
  
   const handleBlockList=(item)=>{
    if(data.uid==item.senderid){
      set(push(ref(db, 'block/')), {
     block:item.receivername,
     blockid:item.receiverid,
     blockby:item.sendername,
     blockbyid:item.senderid,
    }).then(() => {
        remove(ref(db, 'friend/' + item.frId))
        })
    }else{
      set(push(ref(db, 'block/')), {
        block:item.sendername,
        blockid:item.senderid,
        blockby:item.receivername,
        blockbyid:item.receiverid
        }).then(() => {
           remove((ref(db, 'friend/' + item.frId)))
      })
    }
   }

 const handleActiveFriend =(item)=>{
  console.log(item);
  if( data.uid == item.receiverid){
    dispatch(activeChat({id:item.senderid , name:item.sendername}));
    // localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
    localStorage.setItem('activeChat', JSON.stringify(activeChat(item.sendername)))

      }else{
    dispatch(activeChat({id:item.receiverid , name:item.receivername}))
    localStorage.setItem('activeChat', JSON.stringify(activeChat(item.receivername))) 
  }
 }
  return (
    <section className={` ${className}`}>
      <div className={`pt-4 pb-9 shadow-shadow px-7 rounded-xl overflow-y-scroll  ${friendsClass}`}>
        <Flex className=' justify-between'>
          <SubHeading text='Friends' className=' text-signBtn' />
          <PiDotsThreeOutlineVerticalDuotone className='mt-1 text-signBtn' />
        </Flex >

        <div className=' relative '>
          {friendAccept.map(item => (
            <div onClick={()=>handleActiveFriend(item)} className=''>
              <Flex className=' mt-5 justify-between'>

                <Flex className=" gap-x-4">
                  <Image src={Friend1} alt={Friend1} />
                  <div className=' mt-2 '>
                    <SubHeading text=
                      {
                        data.uid == item.senderid ? item.receivername : item.sendername
                      }
                    />
                    <Medium text='Dinner?' className=' text-xs' />
                  </div>
                </Flex>
             

               </Flex>


              <div className='border  mt-2'></div>

            </div>
          ))}
         
        </div>
      </div>

    </section>
  )
}

export default MessageFriends
