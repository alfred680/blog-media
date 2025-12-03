import { faApple, faGoogle, faYahoo } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Auth({ regester }) {
    return (
        <>
            <div className='grid grid-cols-2 '>
                <div >
                   <h1 style={{ marginTop: "60px" }} className='text-5xl font-bold text-center'> {! regester ? "Welcome Back" : "Create an Account"}</h1>
                    
                    
                    <div className='flex flex-col gap-4 '>
                        <input style={{ width: "370px", marginLeft: "200px", marginTop: "80px", height: "40px" }} className='border rounded-3xl' type="text" placeholder=' Email' />
                       {regester && <input style={{ width: "370px", marginLeft: "200px", height: "40px" }} className='border rounded-3xl' type="text" placeholder=' UserName' />}
                        <input style={{ width: "370px", marginLeft: "200px", height: "40px" }} className='border rounded-3xl' type="password" placeholder=' Password' />
                        <a style={{ marginLeft: "400px", fontFamily: "Intel One Mono" }} className='text-blue-600' href="">Forget Passord ?</a>
                        {! regester ?<button style={{ marginLeft: "200px", fontFamily: "Intel One Mono", width: "370px", height: "40px" }} className='bg-black text-white rounded-4xl'><Link to={'/home'}>Login</Link></button>
                        :<button style={{ marginLeft: "200px", fontFamily: "Intel One Mono", width: "370px", height: "40px" }} className='bg-blue-600 text-white rounded-4xl'>Register</button>}
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
                       {! regester ? <p style={{ fontFamily: "Roboto", marginLeft: "270px", marginTop: "20px" }}> Not Registed ?<Link to={"/register"}><span style={{ fontFamily: "Mulish" }} className='text-green-600'> Register Now</span></Link></p>
                       :<p style={{ fontFamily: "Roboto", marginLeft: "270px", marginTop: "20px" }}> Already Have an Account ?<Link to={"/login"}><span style={{ fontFamily: "Mulish" }} className='text-blue-700'> Login Now</span></Link></p>}
                    </div>

                </div>
                <div>
                   {!regester ? <img style={{height:"700px",width:"auto",}} src="https://img.freepik.com/premium-vector/security-password-concept-illustration_251005-470.jpg" alt="no image" />
                   :

                   <img style={{height:"500px",width:"auto",marginTop:"120px"}} src="https://static.vecteezy.com/system/resources/previews/010/925/404/non_2x/registration-page-name-and-password-field-fill-in-form-menu-bar-corporate-website-create-account-user-information-flat-design-modern-illustration-vector.jpg" alt="no image" />}
                </div>


            </div>
        </>
    )
}

export default Auth