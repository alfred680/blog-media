import { faApple, faGoogle, faYahoo } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { googleloginAPI, loginAPI, regesterAPI } from '../server/Allapi'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

function Auth({ regester }) {
    const [userdetails, setuserdetails] = useState({
        username: "",
        email: "",
        password: ""

    })

    console.log(userdetails);
    const nav = useNavigate()
    // register
    const handleRegister = async () => {
        const { username, password, email } = userdetails
        if (!username || !password || !email) {
            toast.info("please fill the form")


        } else {
            const result = await regesterAPI({ username, password, email })
            console.log(result);

            if (result.status == 200) {
                toast.success("regesteration is sucessfull")
                setuserdetails({
                    username: "",
                    password: "",
                    email: ""
                })
                nav("/login")

            } else if (result.response.data) {
                toast.warning(result.response.data.message)
            } else {
                toast.error("something went wrong")
                setuserdetails({
                    username: "",
                    password: "",
                    email: ""
                })

            }

        }

    }
    // login
    const handlelogin = async () => {
        const { email, password } = userdetails
        if (!email || !password) {
            toast.info("please fill the form")
        } else {
            const result = await loginAPI({ email, password })
            console.log(result.data);
            if (result.status == 200) {
                toast.success("login sucessfull")
                sessionStorage.setItem("exstinguser", JSON.stringify(result.data.existinguser))
                sessionStorage.setItem("token", result.data.token)

                setTimeout(() => {
                    if (result.data.existinguser.email == "admin@gmail.com") {
                        nav("/admin")
                    } else {
                        nav("/home")
                    }
                }, 1000)
            }

        }
    }
    // goo
   const handleGoogleLogin = async (credentialResponse) => {

    const details = jwtDecode(credentialResponse.credential)
    console.log(details);
    const result = await googleloginAPI({ username: details.name, email: details.email, password: "Googlepass123", photo: details.picture })
    console.log(result);

    if (result.status == 200) {

      toast.success('Login sucessfull.')
      sessionStorage.setItem("exstinguser", JSON.stringify(result.data.existinguser))
      sessionStorage.setItem("token", result.data.token)


      setTimeout(() => {
        if (result.data.existinguser.email == "admin@gmail.com") {
          nav('/admin')
        }
        else {
          nav('/home')
        }
      }, 2000)

    }



  }
    return (
        <>
            <div className='grid grid-cols-2 '>
                <div >
                    <h1 style={{ marginTop: "60px" }} className='text-5xl font-bold text-center'> {!regester ? "Welcome Back" : "Create an Account"}</h1>


                    <div className='flex flex-col gap-4 '>
                        <input value={userdetails.email} onChange={(e) => setuserdetails({ ...userdetails, email: e.target.value })} style={{ width: "370px", marginLeft: "200px", marginTop: "80px", height: "40px" }} className='border rounded-3xl' type="text" placeholder=' Email' />
                        {regester && <input value={userdetails.username} onChange={(e) => setuserdetails({ ...userdetails, username: e.target.value })} style={{ width: "370px", marginLeft: "200px", height: "40px" }} className='border rounded-3xl' type="text" placeholder=' UserName' />}
                        <input value={userdetails.password} onChange={(e) => setuserdetails({ ...userdetails, password: e.target.value })} style={{ width: "370px", marginLeft: "200px", height: "40px" }} className='border rounded-3xl' type="password" placeholder=' Password' />
                        <a style={{ marginLeft: "400px", fontFamily: "Intel One Mono" }} className='text-blue-600' href="">Forget Passord ?</a>
                        {!regester ? <button onClick={handlelogin} style={{ marginLeft: "200px", fontFamily: "Intel One Mono", width: "370px", height: "40px" }} className='bg-black text-white rounded-4xl'>Login</button>
                            : <button onClick={handleRegister} style={{ marginLeft: "200px", fontFamily: "Intel One Mono", width: "370px", height: "40px" }} className='bg-blue-600 text-white rounded-4xl'>Register</button>}
                        <p className='text-center'>-------- Or Continue With -------- </p>
                        <div style={{ marginRight: "10px", marginTop: "10px" }} className='flex gap-4 justify-center items-center '>
                          <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        handleGoogleLogin(credentialResponse)
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />

                        </div>
                        {!regester ? <p style={{ fontFamily: "Roboto", marginLeft: "270px", marginTop: "20px" }}> Not Registed ?<Link to={"/register"}><span style={{ fontFamily: "Mulish" }} className='text-green-600'> Register Now</span></Link></p>
                            : <p style={{ fontFamily: "Roboto", marginLeft: "270px", marginTop: "20px" }}> Already Have an Account ?<Link to={"/login"}><span style={{ fontFamily: "Mulish" }} className='text-blue-700'> Login Now</span></Link></p>}
                    </div>

                </div>
                <div>
                    {!regester ? <img style={{ height: "700px", width: "auto", }} src="https://img.freepik.com/premium-vector/security-password-concept-illustration_251005-470.jpg" alt="no image" />
                        :

                        <img style={{ height: "500px", width: "auto", marginTop: "120px" }} src="https://static.vecteezy.com/system/resources/previews/010/925/404/non_2x/registration-page-name-and-password-field-fill-in-form-menu-bar-corporate-website-create-account-user-information-flat-design-modern-illustration-vector.jpg" alt="no image" />}
                </div>
                <ToastContainer position='top-center' />


            </div>
        </>
    )
}

export default Auth