import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
  <footer className="bg-gray-900 text-white py-10">
  <div style={{height:"200px"}} className="max-w-full mx-auto px-4 text-center" >

    <h2 style={{fontSize:"40px"}} className="text-2xl font-semibold mb-4">Contact</h2>

   

    <div className="flex flex-col items-center  justify-center gap-1 text-gray-300 text-lg ">
      <div style={{marginTop:"10px"}} className='flex items-center'>
        <FontAwesomeIcon icon={faInstagram} />
        <h1>Instagram</h1>
        </div>
        <div className='flex items-center'>
        <FontAwesomeIcon icon={faFacebook} />
        <h1>Facebook</h1>
        </div>
        <div className='flex items-center'>
        <FontAwesomeIcon icon={faEnvelope} />
        <h1>raj@gmail.com</h1>
        </div>
     
    </div>

    
       
    <p style={{marginTop:"20px"}} className="text-gray-500 text-sm">
      <hr />
      © 2025 All Rights Reserved
    </p>

  </div>
</footer>

  )
}

export default Footer