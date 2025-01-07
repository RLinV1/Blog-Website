import React, {useState} from 'react'
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddModal from './modals/addModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({getBlogs}) => {
  const supabase = useSupabaseClient();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    navigate("/");
  }
  


  return (
    
    <div className='flex justify-between w-full px-4'>
      <div>
        <div className='text-2xl p-4 font-bold dark:text-white underline cursor-pointer' onClick={() => {navigate("/blogs")}}>Discover</div>
      </div>
      
      <div className='flex justify-end items-center bg-[#678dc5] dark:bg-gray-700'>
          <div className='cursor-pointer p-1 hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800 rounded-lg'>
            <IoIosAddCircleOutline className="dark:text-white" size={30} onClick={() => setOpenModal(true)}/>
            <AddModal openModal={openModal} setOpenModal={setOpenModal} getBlogs={getBlogs}/>
          </div>
          <Flowbite>
              <div className="bg-[#678dc5] dark:bg-gray-700">
                  <nav className="p-4">
                      <DarkThemeToggle className="text-black hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800"/>
                  </nav>
              </div>
          </Flowbite>
          <div className='dark:text-white underline cursor-pointer' onClick={signOut}>
            Sign Out
          </div>
      </div>
    </div>
   
    
  )
}

export default Navbar