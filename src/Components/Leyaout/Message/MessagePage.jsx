import React from 'react'
import SideBar from '../HomePage/SideBar'
import Flex from '../../Flex'
import {RiSearchLine} from 'react-icons/ri'
import {PiDotsThreeOutlineVerticalDuotone} from 'react-icons/pi'
function MessagePage() {
    return (
        <section className='message'>
            <Flex className=' px-5 py-2 gap-x-8'>
                <div className='w-[150px]'>
                    <SideBar />
                </div>
                <Flex className=" gap-x-16">
                    <div className=' w-[427px] '>
                        <div className='relative'>
                            <input type="text" placeholder='search' className=' w-full px-24 py-3 shadow-shadow rounded-lg outline-none ' />
                            <RiSearchLine className='absolute top-4 text-signBtn  left-3' />
                            <PiDotsThreeOutlineVerticalDuotone className='absolute top-4 right-3 text-signBtn' />
                        </div>
                        <Group className=" " />
                        <FriendsRequest className=" mt-10 " />
                    </div>

                    <div className=' w-[380px]'>
                        <Friends />
                        <MyGroup />
                    </div>

                    <div className=' w-[380px] '>
                        <User />
                        <Block />
                    </div>
                </Flex>

            </Flex>
        </section>
    )
}

export default MessagePage
