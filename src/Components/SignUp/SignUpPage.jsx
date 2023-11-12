import React, { useState } from 'react'
import Flex from '../Flex'
import Image from '../Image'
import SignUpImg from '../../assets/SignUpImg.png'
import SignUp from '../SignUp'
import SignBtn from '../SignBtn'
import OpenFront from '../OpenFront'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { getDatabase, push, ref, set } from "firebase/database";

function SignUpPage() {

   const db = getDatabase();
   const auth = getAuth();
   const navigate = useNavigate();
   const [Email, setEmail] = useState('')
   const [FullName, setFullName] = useState('')
   const [Password, setPassword] = useState('')
   const [error, setError] = useState(null);
   const [Success, setSuccess] = useState('');
   const [Loading, setLoading] = useState(true)
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
      setLoading(true)
      if (Email && Password && FullName && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {
         createUserWithEmailAndPassword(auth, Email, Password).then((user) => {
            updateProfile(auth.currentUser, {
               displayName: FullName,
               photoURL: '/src/assets/white1.jpg'
            }).then(() => {
               toast.success('Registration Done,Go LoginPage after verify Your Email');
               setEmail('')
               setFullName('')
               setPassword('')
               setLoading(false)
               sendEmailVerification(auth.currentUser)
               setTimeout(() => {
                  navigate('/login')
               }, 1500)
            }).then(() => {
               set(ref(db, 'users/' + user.user.uid), {
                  username: user.user.displayName,
                  email: user.user.email,
               });
            })
               .catch((error) => {
                  // An error occurred
                  // ...
               });
         }).catch((error) => {
            if (error.code.includes('auth/email-already-in-use')) {
               setEmailErr("this email is already  use");
            }
         })

      }

      if (!Email) {
         setEmailErr("Please Enter Your Email");
      } else {
         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))
            setEmailErr("Enter Your Valid Email")
      }

      if (!FullName) {
         setFullNameErr("Please Enter Your FullName");
      }
      if (!Password) {
         setPasswordErr("Please Enter Your Password");
      } else {
         if (!/^(?=.{8,})/.test(Password)) {
            setPasswordErr("Please Enter 8 Character  Password");
         }
      }
   }

   const handleShow = () => {
      setPasswordShow(!PasswordShow)
   }


   return (

      <Flex className="">
         <Flex className="w-2/4 mt-28 mr-[69px] justify-end" >
            <div>
               <SignUp text="Get started with easily register" className="font-bold text-34 text-primary" />
               <SignUp text="Free register and you can enjoy it" className="font-normal text-xl text-common mt-3" />
               <ToastContainer theme="dark" position="top-center" />
               <div className='relative mt-7'>
                  <input type="email" placeholder='Email' value={Email} onChange={handleEmail} className=' py-5 pl-[52px] rounded-lg pr-16 text-xl font-semibold font-lob border-solid w-96 border-border border-2	' />
                  <SignUp text="Email Address" className="absolute -top-[11px] left-7 font-semibold text-13 text-[#585d8e]   bg-white px-5" />
                  {
                     EmailErr &&
                     <p className=' bg-red-500 text-white w-96  mt-2'>{EmailErr}</p>
                  }

               </div>


               <div className='relative mt-6'>
                  <input type="name" placeholder='FullName' value={FullName} onChange={handleFullName} className=' py-5 pl-[52px]   rounded-lg pr-16 border-solid text-xl font-semibold font-lob w-96 border-border border-2	' />
                  <SignUp text="Ful name" className="absolute -top-[11px] left-7 font-semibold text-13 text-[#585d8e]   bg-white px-5" />

                  {
                     FullNameErr &&
                     <p className=' bg-red-500 text-white w-96 mt-2'>{FullNameErr}</p>

                  }
               </div>


               <div className='relative mt-7'>
                  <input type={PasswordShow ? 'text' : 'password'} value={Password} placeholder='Password' onChange={handlePassword} className=' py-5 text-xl font-semibold font-lob pl-[52px]   rounded-lg  pr-16 border-solid w-96 border-border border-2	' />
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
               {
                  Loading ?


                     <div onClick={handleSubmit} className='w-96 mt-8 '>
                        <SignBtn text="Sign Up" className="w-full  py-4" />
                     </div>
                     :
                     <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                     />
               }


               <Flex className="flex-row  mt-6 w-96 ml-20">
                  <OpenFront text="Already  have an account ?" className="font-normal text-[#03014C] text-13" />
                  <Link to='/login' className='text-[#EA6C00] text-13 font-bold '> Sign In</Link>
               </Flex>
            </div>
         </Flex>
         <div className="w-2/4">
            <Image src={SignUpImg} alt={SignUpImg} className=" h-screen  w-full object-cover" />
         </div>
      </Flex>

   )
}

export default SignUpPage