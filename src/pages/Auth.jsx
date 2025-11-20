import { faApple, faGoogle, faYahoo } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Auth() {
    return (
        <>
            <div className='grid grid-cols-2 '>
                <div >
                    <h1 style={{ marginTop: "60px" }} className='text-5xl font-bold text-center'> Welcome Back</h1>
                    <div className='flex flex-col gap-4 '>
                        <input style={{ width: "370px", marginLeft: "200px", marginTop: "80px", height: "40px" }} className='border rounded-3xl' type="text" placeholder=' UserName' />
                        <input style={{ width: "370px", marginLeft: "200px", height: "40px" }} className='border rounded-3xl' type="text" placeholder=' Email' />
                        <input style={{ width: "370px", marginLeft: "200px", height: "40px" }} className='border rounded-3xl' type="password" placeholder=' Password' />
                        <a style={{ marginLeft: "400px", fontFamily: "Intel One Mono" }} className='text-blue-600' href="">Forget Passord ?</a>
                        <button style={{ marginLeft: "200px", fontFamily: "Intel One Mono", width: "370px", height: "40px" }} className='bg-black text-white rounded-4xl'>Login</button>
                        <p className='text-center'>-------- Or Continue With -------- </p>
                        <div style={{ marginRight: "10px", marginTop: "10px" }} className='flex gap-4 justify-center items-center '>
                            <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center  hover:bg-gray-600 transition'>
                                <FontAwesomeIcon icon={faGoogle} className='text-xl' />
                            </div>

                            <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center  hover:bg-gray-600 transition'>
                                <FontAwesomeIcon icon={faApple} className='text-xl' />
                            </div>
                            <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center  hover:bg-gray-600 transition'>
                                <FontAwesomeIcon icon={faYahoo} className='text-xl' />
                            </div>

                        </div>
                        <p style={{ fontFamily: "Roboto", marginLeft: "270px", marginTop: "20px" }}> Not Registed ?<span style={{ fontFamily: "Mulish" }} className='text-green-600'> Register Now</span></p>
                    </div>

                </div>
                <div>
                    <img style={{height:"700px",width:"auto",}} src="https://img.freepik.com/premium-vector/security-password-concept-illustration_251005-470.jpg" alt="no image" />
                </div>


            </div>
        </>
    )
}

export default Auth