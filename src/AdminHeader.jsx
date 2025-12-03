import { faCircleUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function AdminHeader() {
     const [open, setOpen] =useState(false)
  return (
    <>
    <div>
         <header className="bg-blue-200 shadow-sm  rounded-4xl mr-2   ">
      <div className="h-[50px]  px-6 py-4 flex items-center justify-between ">

       
        <div className="flex items-center">
          <span className="text-2xl ml-10 font-extrabold tracking-tight">BlogMedia</span>
        </div>

        
        

        <div className="flex items-center gap-6 relative">

         

          
          <button
            onClick={() => setOpen(!open)}
            className="text-xl hover:text-blue-600 cursor-pointer p-1"
          >
            <FontAwesomeIcon 
              icon={faCircleUser} 
              style={{ height: "28px", width: "auto" }} 
            />
          </button>

          
          {open && (
            <div className="absolute right-0 top-12 w-32 bg-white border shadow-xl rounded-lg py-1 z-20">

              <div 
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FontAwesomeIcon  icon={faRightToBracket} />
                <span className="font-medium">Logout</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </header>
    </div>
    </>
   
  )
}

export default AdminHeader