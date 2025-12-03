import { faCircleUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'  

function Header2() {

  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[#4D4A4A] shadow-sm  rounded-4xl mr-2   ml-60">
      <div className="h-[50px]  px-6 py-4 flex items-center justify-between ">

       
        <div className="flex items-center">
          <span className="text-2xl ml-10 font-extrabold tracking-tight text-white">BlogMedia</span>
        </div>

        
        

        {/* Right - Actions */}
        <div className="flex items-center gap-6 relative">

         

          {/* User Icon */}
          <button
            onClick={() => setOpen(!open)}
            className="text-xl hover:text-blue-600 cursor-pointer p-1"
          >
            <FontAwesomeIcon 
              icon={faCircleUser} 
              style={{ height: "28px", width: "auto",color: "#00c853" }} 
            />
          </button>

          {/* Dropdown Menu */}
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
  )
}

export default Header2
