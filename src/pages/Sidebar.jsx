import { faCashApp } from '@fortawesome/free-brands-svg-icons'
import { faCircleUser, faDiamond, faDiamondTurnRight, faEnvelope, faHouse, faMessage, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const [home, sethome] = useState(false)
    const [profile, setprofile] = useState(false)
    const [premium, setpremium] = useState(false)
    const [author, setautor] = useState(false)
    const [inbox, setinbox] = useState(false)

    const Nav = useNavigate()

    const handlepage = (page) => {
        if (page == "home") {
            Nav('/home')
        } else if (page == "profile") {
            Nav('/profile')
        } else if (page == "premiem") {
            Nav('/premiem')
        } else if (page == "Topauthor") {
            Nav('/topauthor')
        } else if (page == "Index") {
            Nav('/inbox')
        }

    }
    useEffect(() => {
        if (location.pathname == '/home') {
            sethome(true)
        } else if (location.pathname == '/profile') {
            setprofile(true)
        } else if (location.pathname == '/premiem') {
            setpremium(true)
        } else if (location.pathname == '/topauthor') {
            setautor(true)
        } else if (location.pathname == '/inbox') {
            setinbox(true)
        }
    }, [])
    return (
        <>
            <div>
                <div className='rounded-4xl' style={{ height: "700px", backgroundColor: "#EDEFF3", width: "240px ", marginTop: "-10px" }}>
                    <div className='flex  '>
                        <div className='text-2xl' style={{ marginTop: "30px", marginLeft: "30px" }}>
                            <FontAwesomeIcon icon={faDiamondTurnRight} />
                        </div>

                        <h1 style={{ marginTop: "30px", marginLeft: "10px" }} className='text-2xl font-bold '> Menu</h1>

                    </div>
                    <hr style={{ marginTop: "20px" }} className='my-6 border-gray-400 ' />
                    <div>
                        <div onClick={() => { sethome(true), setprofile(false), setpremium(false), setautor(false), setinbox(false) }} className={home ? ' text-white bg-black cursor-pointer h-12 mt-4  rounded-2xl font-bold ' : 'text-black'}>
                            <div className='flex' style={{ marginTop: "40px", marginLeft: "10px" }}>
                                <div className='text-2xl' style={{ marginLeft: "30px" }}>
                                    <FontAwesomeIcon icon={faHouse} />
                                </div>

                                <h2 onClick={() => handlepage("home")} style={{ fontSize: "20px", marginTop: "4px", marginLeft: "4px", fontFamily: "Roboto Slab" }}  >Home</h2>

                            </div>
                        </div>
                        <div onClick={() => { setprofile(true), sethome(false), setpremium(false), setautor(false), setinbox(false) }} className={profile ? 'text-white bg-black cursor-pointer h-12 rounded-2xl font-bold' : 'text-black'} >
                            <div className='flex' style={{ marginTop: "40px", marginLeft: "10px" }}>
                                <div className='text-2xl' style={{ marginLeft: "30px" }}>
                                    <FontAwesomeIcon icon={faCircleUser} />
                                </div>

                                <h2 onClick={() => handlepage("profile")} style={{ fontSize: "20px", marginTop: "4px", marginLeft: "4px", fontFamily: "Roboto Slab" }}  >Profile</h2>

                            </div>
                        </div>
                        <div onClick={() => { setprofile(false), sethome(false), setpremium(true), setautor(false), setinbox(false) }} className={premium ? 'text-white bg-black cursor-pointer h-12 rounded-2xl font-bold' : 'text-black'} >
                            <div className='flex' style={{ marginTop: "40px", marginLeft: "8px" }}>
                                <div className='text-2xl' style={{ marginLeft: "30px" }}>
                                    <FontAwesomeIcon icon={faCashApp} />
                                </div>

                                <h2 onClick={() => handlepage("premiem")} style={{ fontSize: "20px", marginTop: "4px", marginLeft: "4px", fontFamily: "Roboto Slab" }}  >Premium</h2>

                            </div>
                        </div>
                        <div onClick={() => { setprofile(false), sethome(false), setpremium(false), setautor(true), setinbox(false) }} className={author ? 'text-white bg-black cursor-pointer h-12 rounded-2xl font-bold' : 'text-black'} >
                            <div className='flex' style={{ marginTop: "40px", marginLeft: "10px" }}>
                                <div className='text-2xl' style={{ marginLeft: "30px" }}>
                                    <FontAwesomeIcon icon={faStar} />

                                </div>

                                <h2 onClick={() => handlepage("Topauthor")} style={{ fontSize: "20px", marginTop: "4px", marginLeft: "4px", fontFamily: "Roboto Slab" }}  >Top Authors</h2>

                            </div>
                        </div>
                        <div onClick={() => { setprofile(false), sethome(false), setpremium(false), setautor(false), setinbox(true) }} className={inbox ? 'text-white bg-black cursor-pointer h-12 rounded-2xl font-bold' : 'text-black'} >
                            <div className='flex' style={{ marginTop: "40px", marginLeft: "10px" }}>
                                <div className='text-2xl' style={{ marginLeft: "30px" }}>
                                    <FontAwesomeIcon icon={faMessage} />

                                </div>

                                <h2 onClick={() => handlepage("Index")} style={{ fontSize: "20px", marginTop: "4px", marginLeft: "4px", fontFamily: "Roboto Slab" }}  >Inbox</h2>

                            </div>
                        </div>
                    </div>
                    <hr style={{ marginTop: "160px" }} className='my-6 border-gray-400 ' />

                    <div >

                        <div className='flex' style={{ marginTop: "10px", marginLeft: "0px" }}>
                            <div className='text-2xl' style={{ marginLeft: "10px", marginTop: "-6px" }}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>

                            <h2 style={{ fontSize: "20px", marginTop: "-4px", marginLeft: "0px", fontFamily: "Roboto" }}  >Support@gmail.com</h2>

                        </div>
                    </div>



                </div>

            </div>
        </>

    )
}

export default Sidebar