import React from 'react'
import { DarkThemeToggle, Flowbite } from "flowbite-react";

const Navbar = () => {
  return (
    <div className='flex justify-end w-full bg-gray-100 dark:bg-gray-800'>
        <Flowbite>
            <div className="bg-gray-100 dark:bg-gray-800">
                <nav className="p-4">
                    <DarkThemeToggle />
                </nav>
            </div>
        </Flowbite>
    </div>
    
  )
}

export default Navbar