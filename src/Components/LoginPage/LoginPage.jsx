import React, { useState } from 'react'
import Flex from '../Flex'
import Image from '../Image'
import LoginImg from '../../assets/LoginImg.jpg'
import SignUp from '../SignUp'
import SignBtn from '../SignBtn'
import OpenFront from '../OpenFront'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../Slices/userSlice'



function LoginPage() {
   const dispatch = useDispatch()
   const auth = getAuth();
   const provider = new GoogleAuthProvider();
   const navigate = useNavigate();


   const [Email, setEmail] = useState('')
   const [FullName, setFullName] = useState('')
   const [Password, setPassword] = useState('')
   const [error, setError] = useState(null);

   const [EmailErr, setEmailErr] = useState('')
   const [FullNameErr, setFullNameErr] = useState('')
   const [PasswordErr, setPasswordErr] = useState('')
   const [PasswordShow, setPasswordShow] = useState(false)
   const handleEmail = event => {
      setEmail(event.target.value);
      setEmailErr("")
   };


   const handleFullName = (e) => {
      setFullName(e.target.value);
      setFullNameErr("")
   }
   const handlePassword = (e) => {
      setPassword(e.target.value);
      setPasswordErr("")
   }

   const handleSubmit = (e) => {
      if (!Email) {
         setEmailErr("Please Enter Your Email");
      } else {
         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))
            setEmailErr("Enter Your Valid Email")
      }
      if (!Email) {
         setFullNameErr("Please Enter Your FullName");
      }
      if (!Password) {
         setPasswordErr("Please Enter Your Password");
      } else {
         if (!/^(?=.{8,})/.test(Password)) {
            setPasswordErr("Please Enter 8 Character  Password");
         }
      }


      if (Email && Password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {
         signInWithEmailAndPassword(auth, Email, Password).then((user) => {
            dispatch(userLoginInfo(user.user));

            localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
            toast.success('Login');
            setTimeout(() => {
               navigate('/home')
            }, 2000);
         })

            .catch((error) => {


            });
      }
   }


   const handleGoogle = () => {
      signInWithPopup(auth, provider)
         .then(() => {
            setTimeout(() => {
               navigate('/home')
            }, 3000)
         }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
         });
   }

   const handleShow = () => {
      setPasswordShow(!PasswordShow)
   }


   return (

      <Flex className="">
         <Flex className="w-2/4 mt-28 mr-[69px] justify-end" >
            <ToastContainer theme="dark" position="top-center" />
            <div>
               <SignUp text="Login to your account!" className="font-bold text-34 text-primary" />
               <Flex>
                  <div onClick={handleGoogle} className='relative my-5'>
                     <button className=' py-4 pr-6 pl-10  border ml-3'>Login with Google</button>
                     <FcGoogle className='absolute top-5 left-7' size={20} />
                  </div>
               </Flex>


               <div className='relative mt-7'>
                  <input type="email" placeholder='Enter your Email' onChange={handleEmail} className=' py-5 pl-[52px]  pr-16 border-solid w-96 text-xl font-semibold font-lob border-b-2 focus:outline-none' />
                  <SignUp text="Email Address" className="absolute -top-[11px] left-7 font-semibold text-13 text-[#585d8e]   bg-white px-5" />
                  {
                     EmailErr &&
                     <p className=' bg-red-500 text-white w-96  mt-2'>{EmailErr}</p>
                  }

               </div>

               <div className='relative mt-7'>
                  <input type={PasswordShow ? 'text' : 'password'} value={Password} placeholder='Enter your password' onChange={handlePassword} className=' py-5 pl-[52px]   rounded-lg  pr-16border-solid text-xl font-semibold font-lob
               w-96 border-b-2 focus:outline-none' />
                  <SignUp text="Password" className="absolute -top-[11px] left-7 font-semibold text-13 text-[#585d8e]   bg-white px-5" />
                  {
                     PasswordShow ?
                        <AiFillEye onClick={handleShow} className='absolute top-6 right-24' />
                        :
                        <AiFillEyeInvisible onClick={handleShow} className='absolute top-6 right-24' />
                  }
                  {
                     PasswordErr &&
                     <p className=' bg-red-500 text-white w-96 mt-2'>{PasswordErr}</p>

                  }             </div>
               <Link to='/forget'>
                  <p className='text-[#EA6C00] ml-64 w-32 mt-3'>Forget Password</p>
               </Link>
               <div onClick={handleSubmit} className='w-96 mt-8 '>
                  <SignBtn text="Login to Continue" className="w-full  py-4 hover:border-signBtn" />
               </div>

               <Flex className="flex-row  mt-6 w-96 ml-20">
                  <OpenFront text="Don’t have an account ? " className="font-normal text-[#03014C] text-13" /> <Link to="/" className='text-[#EA6C00] text-13 font-bold '> Sign up</Link >
               </Flex>
            </div>
         </Flex>
         <div className="w-2/4">
            <Image src={LoginImg} alt={LoginImg} className=" h-screen  w-full object-cover" />
         </div>


      </Flex>

   )
}

export default LoginPage