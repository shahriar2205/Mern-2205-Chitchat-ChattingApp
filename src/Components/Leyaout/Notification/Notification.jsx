import SideBar from '../HomePage/SideBar'
import Flex from '../../Flex'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { RotatingLines } from 'react-loader-spinner'
import { userLoginInfo } from '../../Slices/userSlice'
import { useState } from 'react'

function Notification() {
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
    <section className='notification'>
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
    <Flex className=" px-5 py-2 gap-x-8">
    <div className='w-[150px]'>
                    <SideBar />
                </div>
    </Flex>
        }
    </section>
  )
}

export default Notification
