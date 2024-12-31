import React, {useState} from 'react'
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddModal from './modals/addModal';

const Navbar = ({getBlogs}) => {
  const [openModal, setOpenModal] = useState(false);
  
  
  

  return (
    <div className='flex w-full justify-between px-4'>
      <div>
        <h1 className='text-3xl font-bold text-white dark:text-gray-200 p-4'>Blogs</h1>
      </div>
      <div className='flex justify-end items-center w-full bg-[#678dc5] dark:bg-gray-700'>
          <div className='cursor-pointer p-1 hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800 rounded-lg'>
            <IoIosAddCircleOutline size={30} onClick={() => setOpenModal(true)}/>
            <AddModal  openModal={openModal} setOpenModal={setOpenModal} getBlogs={getBlogs}/>
          </div>
          <Flowbite>
              <div className="bg-[#678dc5] dark:bg-gray-700">
                  <nav className="p-4">
                      <DarkThemeToggle className="text-black hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800"/>
                  </nav>
              </div>
          </Flowbite>
      </div>
    </div>
   
    
  )
}

export default Navbar