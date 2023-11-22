import React, { useEffect, useState } from 'react'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi'
import { RiSearchLine } from 'react-icons/ri'
import SubHeading from '../SubHeading'
import Flex from '../../../Flex'
import Group1 from '../../../Photo/Group1.png'
import Group2 from '../../../Photo/Group2.png'
import Group3 from '../../../Photo/Group3.png'
import Medium from '../Medium'
import Image from '../../../Image'
import Btn from '../Btn'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosCreate } from 'react-icons/io'
import { BsBackspace } from 'react-icons/bs'
import { LineWave } from 'react-loader-spinner'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import {MdOutlineGroupOff} from 'react-icons/md'
const Group = ({ className, midText, subText, src }) => {
   const data = useSelector(state => state.userLoginInfo.userInfo)
   const [show, setshow] = useState(false)
   const [GroupName, setGroupName] = useState("")
   const [GroupTagName, setGroupTagName] = useState("")
   const [Loading, setLoading] = useState(true)
   const [GroupNameErr, setGroupNameErr] = useState("")
   const [GroupTagNameErr, setGroupTagNameErr] = useState("")
const [GroupListShow,setGroupListShow]=useState([])
   const db = getDatabase();

   const handleShowOf = () => {
      setshow(!show)
   }
   const handleCancel = () => {
      setshow(false)
   }
   const handleGroupName = (e) => {
      setGroupName(e.target.value);
      setGroupNameErr("")

   }
   const handleTagName = (e) => {
      setGroupTagName(e.target.value);
      setGroupTagNameErr("")

   }
   const handleCreateGroup = (e) => {
      setLoading (true)
      if(GroupName && GroupTagName){
         set(push(ref(db, 'group/')), {
            groupName: GroupName,
            groupTagName: GroupTagName,
            adminName: data.displayName,
            adminId: data.uid,
         }).then(()=>{
            setGroupName(' ')
            setGroupTagName(' ')
            setLoading(false)
            setTimeout(()=>{
               setshow(false)
               setLoading(true)
               toast.success('Group Create')
            },1500)
         })
      }else{
         setGroupNameErr("Please Give a Group Name")
         setGroupTagNameErr("Please Give a Tag Name")
      }
    }
  useEffect(()=>{
   const GroupList=ref(db, 'group/');
   onValue(GroupList, (snapshot)=>{
      let arr=[];
      snapshot.forEach((item)=>{
     if(data.uid != item.val().adminId){
      arr.push({...item.val(),id:item.key})
     }
      })
      setGroupListShow(arr)
   })
}, [])
   return (
      <section className={`${className} GroupPart `} >

         <div>
            <div className=' relative py-4 shadow-shadow px-3 mt-4 rounded-xl overflow-y-scroll h-[300px]'>
               <Flex className=' justify-between'>
                  <SubHeading text='Groups List ' className=' text-signBtn' />
                  <PiDotsThreeOutlineVerticalDuotone className='mt-1 text-signBtn' />
               </Flex>
       
               <ToastContainer
            position="top-left"
            autoClose={1800}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
     

               {
                  show ?
                     <button onClick={handleShowOf} className="text-center items-center flex justify-center mx-auto my-1 bg-green-500 py-1 px-2  gap-x-1 rounded-lg text-gray-500 ">
                        <BsBackspace />
                        Back
                     </button>
                     :
                     <button onClick={handleShowOf} className="text-center items-center flex justify-center mx-auto my-1 bg-green-500 py-2 px-2 rounded-lg gap-x-1  text-gray-500">
                        <IoIosCreate size={20} />
                        Group Create
                     </button>
               }
   <div>
      
         </div>
               {
                  show ?
                     <div className=' bg-[#a8c7fc] py-3 relative'>
                        <Flex className=" justify-between items-center text-gray-700">
                           <h3 className=' mx-auto text-[25px] font-lob'>Group Name</h3>
                           <AiOutlineClose onClick={handleCancel} className=' absolute top-0  right-1 rounded-full px-2 py-1 bg-white text-black text-[30px]' />
                        </Flex>
                        <div className=' mt-2 text-center '>
                           <input value={GroupName} onChange={handleGroupName} type=" text" placeholder='Group Name' className=' px-7 py-1 w-72 outline-none border-4' />
                           <p>{GroupNameErr}</p>
                           <input value={GroupTagName} onChange={handleTagName} type=" text" placeholder='Group Tag Name' className=' px-7 py-1 mt-4 w-72 outline-none border-2' />
                          <p>{GroupTagNameErr}</p>
                        </div>
                        {
                           Loading ?
                              <button onClick={handleCreateGroup} className='text-center flex mx-auto py-1 px-3 mt-2 bg-green-600 rounded-md hover:scale-95 duration-500 hover:text-white cursor-pointer'>Create Group</button>
                              :
                              <div className='text-center flex justify-center'>
                                 <LineWave
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="rotating-triangels-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="rotating-triangels-wrapper mt-[-24px]"
                                    color="red" firstLineColor="green"
                                 />
                              </div>
                        }
                     </div>
                     :
                   <div>
                     {
                        GroupListShow.length==0
                        ?
                       <MdOutlineGroupOff className='flex justify-center text-5xl mt-14 mx-auto'/>
                        :
                        GroupListShow.map((item)=>{
                           return  <div>
                             <Flex className=' mt-5 justify-between '>
                                <Flex>
                                   <Image className=" w-[50px] h-[50px] rounded-full" src={data.photoURL} alt={Group1} />
                                   <div className=' ml-4'>
                                      <SubHeading text={
                                         item.groupName
                                      } className=' text-lg' />
                                      <Medium text={
                                         item.groupTagName
                                      } className=' text-sm' />
                                   </div>
                                </Flex>
                                <Btn text='Join' className=' h-9 my-auto ' />
                             </Flex>
                             <div className='border mt-4'></div>
                          </div>
                          })
                     }
                                 
                   </div>

               }
            </div>
         </div>
      </section>
   )
}

export default Group
