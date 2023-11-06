import React from 'react'
import { useState } from 'react'
import {FaLock} from 'react-icons/fa'
import {TfiEmail} from 'react-icons/tfi'
import { ToastContainer, toast } from 'react-toastify';

import Flex from '../../Flex'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Forget() {
    const auth = getAuth();
    const [Email,setEmail]=useState('')
const  handleChange =(e)=>{
 setEmail(e.target.value)
 
}

const handlePassword=()=>{
    sendPasswordResetEmail(auth, Email)
  .then(() => {
    toast.success('Cheak Your  Email & Change Your Password');

    setEmail('')
  })
  .catch((error) => {
   
  });
}
  return (
    <Flex className=' h-screen w-full bg-slate-500 text-center justify-center items-center'>
               <ToastContainer  theme="dark" position="top-center"/>

        <div className='border w-96 mx-auto '>
         <div className=' px-12 pt-10 pb-3'>
        <Flex className="flex-col items-center justify-center text-center">
        <FaLock className=' text-[#3f3d3d] ' size={200}/>
            <h3 className="text-34 mt-7 text-white">Forgot Password?</h3>
            <p className=' text-white'>You can reset your password here.</p>
        </Flex>
     
            
           <Flex className=" border-2 border-[#ccc] mt-7 rounded w-72 h-9 mx-auto">
           <div className=' w-11 bg-slate-300'>
           <TfiEmail className='mx-auto mt-2' size={17}/>
           </div>
       <input onChange={handleChange} value={Email} className='w-full outline-none p-3' type="email" id='email' name='email' placeholder='email adress'  />
           </Flex>
      <Flex className="justify-center gap-x-7 mt-4 "> 
      <button onClick={handlePassword} className=' px-9 py-3 rounded-md bg-[#2e7cc0] text-white'>Reset</button>

     <Link to='/login'>
     <button className=' px-5 py-3 rounded-md bg-[#2d7bc0] text-white'>Back to LogIn</button>
     </Link>
      
      </Flex>
        </div>
        </div>
    </Flex>
  )
}

export default Forget