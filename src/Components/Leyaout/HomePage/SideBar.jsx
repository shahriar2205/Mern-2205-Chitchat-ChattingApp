import React, { createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Flex from '../../Flex';
import { SiHomeassistant } from 'react-icons/si'
import { AiFillMessage } from 'react-icons/ai'
import { RiNotification3Fill } from 'react-icons/ri'
import { TbSettingsCog } from 'react-icons/tb'
import { AiOutlineLogout } from 'react-icons/ai'
import { userLoginInfo } from '../../Slices/userSlice';
import Image from '../../Image';
import { ImUpload } from 'react-icons/im'
import { getAuth, signOut, updateProfile } from "firebase/auth";
import "cropperjs/dist/cropper.css";
import { Cropper } from 'react-cropper';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

function SideBar({ className,active }) {

  const storage = getStorage()
  const [ProfileImageUpload, setProfileImageIpload] = useState(false)
  const auth = getAuth();
  const data = useSelector(state => state.userLoginInfo.userInfo)



  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/login')
      dispatch(userLoginInfo(null))
      localStorage.removeItem('userLoginInfo')
    }).catch((error) => {

    });

  }
  const handlePhotoUpload = () => {
    setProfileImageIpload(true)
  }

  const handleCancel = () => {
    setProfileImageIpload(false)
  }
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState('');
  const cropperRef = createRef();

  const handleChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;

    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            setImage('')
            setCropData("")
            setProfileImageIpload(false)
          })
        });
      });
    }
  };



  return (
    <section>
      <div className={` bg-signBtn px-9   h-screen rounded-lg py-5 ${className}`}>
        <div className=' relative w-[80px] group   h-[80px]'>
          <Image src={data.photoURL} alt={data.photoURL} className=" w-[80px] h-[80px] rounded-full  mx-auto" />


          <Flex className='w-full   h-full group-hover:bg-overlay opacity-0 group-hover:opacity-100 duration-500 absolute top-0 left-0 rounded-full justify-center  items-center text-center cursor-pointer  '>
            <ImUpload onClick={handlePhotoUpload} className='text-2xl text-white ' />
          </Flex>
          <h2 className='ml-[-25px] mt-3 text-[#f0e9ecaa] font-nos  border-b-4 border-dotted text-xl	'>{data.displayName}</h2>
        </div>

          <div className={` mt-28  text-4xl relative after:absolute py-3 flex justify-center after:content-[""] after:top-0 after:z-[-1] z-10   after:left-[-16px] after:rounded-l-lg ${active == "Home" && " after:bg-white"} after:w-[111px] after:h-full before:absolute before:content-[""] before:h-full before:w-2 before:bg-signBtn  before:rounded-l-lg before:top-0 before:left-[89px]`}>
        <Link to="/home">
         <SiHomeassistant className={` ${active == "Home" ? "text-signBtn" : "text-white"} items-center text-center mx-auto `} />
        </Link>
          </div>

        <Flex className="flex-col text-4xl gap-y-16 mt-10 text-[#BAD1FF] items-center ">
          <div className={` text-4xl relative after:absolute py-3 flex justify-center after:content-[""] after:top-0 after:z-[-1] z-10   after:left-[-35px] after:rounded-l-lg ${active == "Messages" && " after:bg-white"} after:w-[111px] after:h-full before:absolute before:content-[""] before:h-full before:w-2 before:bg-signBtn  before:rounded-l-lg before:top-0 before:left-[68px]`}>
          <Link to="/message">
            < AiFillMessage className={` ${active == "Messages" ? "text-signBtn" : "text-white"} items-center text-center mx-auto `}  />
          </Link>
          </div>
          <Link to="/notification">
            < RiNotification3Fill />
          </Link>
          <TbSettingsCog />
          <AiOutlineLogout onClick={handleLogOut} className='  text-white' />
        </Flex>
      </div>
      {
        ProfileImageUpload &&
        <div className=' mt-2 h-screen  bg-signBtn w-full absolute top-0 left-0 z-10 '>
          <div className='bg-white w-1/2 mx-auto mt-16  p-5 '>
            <h2 className='text-4xl text-[#777] ml-40'>Upload Your Image</h2>

            <div className=' relative w-[100px] mx-auto  mt-3  h-[100px] rounded-full  '>
              {
                image ?
                  <div
                    className="img-preview  w-[100px] h-[100px] rounded-full overflow-hidden  "

                  />
                  :
                  <Image src={data.photoURL} alt={data.photoURL} className=" w-full h-full rounded-full   mt-3" />
              }

            </div>


            <input onChange={handleChange} type="file" className='mt-3 mb-4' />
            {
              image &&
              <Cropper
                ref={cropperRef}
                style={{ height: 300, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            }
            <Flex className=" mt-4 gap-x-7">
              <button onClick={getCropData} type='button' className='  bg-signBtn text-white px-6 py-2 rounded-lg hover:bg-black hover:text-signBtn '>Upload </button>
              <button onClick={handleCancel} type='button' className=' bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-black hover:text-red-900 '>Cancel </button>

            </Flex>

          </div>
        </div>
      }

    </section>
  )
}

export default SideBar
