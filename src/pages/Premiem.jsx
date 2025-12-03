import React from 'react'
import Header2 from './Header2'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWebAwesome } from '@fortawesome/free-solid-svg-icons'
import Balatro from './Balatro'
import { Link } from 'react-router-dom'

function Premiem() {
    return (
        <>
            <div className='relative min-h-screen'>


                <div className='fixed inset-0 z-[-1]'>
                    <Balatro
                        // Optional: Customize your Balatro effect here
                        spinSpeed={7.0}
                        color1="#006BB4" // Blue
                        color2="#DE443B" // Red
                        mouseInteraction={true}
                    />
                </div>


                <div className='relative z-10'>

                    {/* Header2 is now on top */}


                    {/* Sidebar Container */}
                    <div className=''>
                        {/* Sidebar: Fixed position ensures it overlays the Balatro background */}
                        <div className='fixed left-0 mt-2 top-0 h-screen w-[250px] bg-transparent'>
                            <Sidebar />
                        </div>
                    </div>


                   <div className='flex flex-wrap'>
                        <div
                            className='bg-black text-white ml-86 mt-10 rounded-2xl p-4'
                            style={{ width: "400px", height: "400px" }}
                        >
                            <div className='flex items-center'>
                                <FontAwesomeIcon className='mt-1 text-2xl' icon={faWebAwesome} />
                                <h1 className='ml-4 font-bold text-xl'>Premium</h1>
                            </div>
                            <div>
    
                                <h1 className='mt-8 text-2xl font-bold text-green-400'>Standard</h1>
    
                                <h1 className='mt-4 font-bold' >₹200 for 2 months</h1>
                            </div>
                            <hr className='mt-4 shadow-amber-100' />
                            <div className='mt-4 ml-4 gap-6'>
                                <li>
                                    <ol>Ad-Free Reading</ol>
                                    
                                </li>
                                <li>
                                    <ol>Exclusive Premium Articles</ol>
                                    
                                </li>
                                <li>
                                    <ol>Cancel anytime</ol>
                                    
                                </li>
                              <Link to={'/Premiemform'} >  <button className='bg-green-600 rounded-4xl mt-10 font-bold' style={{width:"320px",height:"40px"}}> Buy</button></Link>
                            </div>
                        </div>
                        <div
                            className='bg-black text-white ml-50 mt-10 rounded-2xl p-4'
                            style={{ width: "400px", height: "400px" }}
                        >
                            <div className='flex items-center'>
                                <FontAwesomeIcon className='mt-1 text-2xl' icon={faWebAwesome} />
                                <h1 className='ml-4 font-bold text-xl'>Premium</h1>
                            </div>
                            <div>
    
                                <h1 className='mt-8 text-2xl font-bold text-blue-600'>Platinum</h1>
    
                                <h1 className='mt-4 font-bold' >₹800 for 3 months</h1>
                            </div>
                            <hr className='mt-4 shadow-amber-100' />
                            <div className='mt-4 ml-4 gap-6'>
                                <li>
                                    <ol>Ad-Free Reading</ol>
                                    
                                </li>
                                <li>
                                    <ol>Exclusive Premium Articles</ol>
                                    
                                </li>
                                 <li>
                                    <ol>Early Access to New Posts of Top Authors</ol>
                                    
                                </li>
                                <li>
                                    <ol>Cancel anytime</ol>
                                    
                                </li>
                               <Link to={'/Premiemform'}> <button className='bg-blue-600 rounded-4xl mt-10 font-bold' style={{width:"320px",height:"40px"}}> Buy</button></Link>
                            </div>
                        </div>
                        <div
                            className='bg-black text-white ml-86 mt-10 rounded-2xl p-4'
                            style={{ width: "400px", height: "400px" }}
                        >
                            <div className='flex items-center'>
                                <FontAwesomeIcon className='mt-1 text-2xl' icon={faWebAwesome} />
                                <h1 className='ml-4 font-bold text-xl'>Premium</h1>
                            </div>
                            <div>
    
                                <h1 className='mt-8 text-2xl font-bold text-purple-600'>Student</h1>
    
                                <h1 className='mt-4 font-bold' >₹50 for 1 months</h1>
                            </div>
                            <hr className='mt-4 shadow-amber-100' />
                            <div className='mt-4 ml-4 gap-6'>
                                <li>
                                    <ol>Ad-Free Reading</ol>
                                    
                                </li>
                                <li>
                                    <ol>Exclusive Premium Articles</ol>
                                    
                                </li>
                                 <li>
                                    <ol>Creator Support System</ol>
                                    
                                </li>
                                <li>
                                    <ol>Cancel anytime</ol>
                                    
                                </li>
                               <Link to={'/Premiemform'}> <button className='bg-purple-600 rounded-4xl mt-10 font-bold' style={{width:"320px",height:"40px"}}> Buy</button></Link>
                            </div>
                            
                        </div>
                        <div
                            className='bg-black text-white ml-50 mt-10 rounded-2xl p-4'
                            style={{ width: "400px", height: "400px" }}
                        >
                            <div className='flex items-center'>
                                <FontAwesomeIcon className='mt-1 text-2xl' icon={faWebAwesome} />
                                <h1 className='ml-4 font-bold text-xl'>Premium</h1>
                            </div>
                            <div>
    
                                <h1 className='mt-8 text-2xl font-bold text-yellow-400'>Gold</h1>
    
                                <h1 className='mt-4 font-bold' >₹140 for 1 months</h1>
                            </div>
                            <hr className='mt-4 shadow-amber-100' />
                            <div className='mt-4 ml-4 gap-6'>
                                <li>
                                    <ol>Ad-Free Reading</ol>
                                    
                                </li>
                                <li>
                                    <ol>Exclusive Premium Articles</ol>
                                    
                                </li>
                                 <li>
                                    <ol>Zero-Delay and Fast Loading</ol>
                                    
                                </li>
                                <li>
                                    <ol>Cancel anytime</ol>
                                    
                                </li>
                               <Link to={'/Premiemform'}> <button className='bg-yellow-400 rounded-4xl mt-10 font-bold' style={{width:"320px",height:"40px"}}> Buy</button></Link>
                            </div>
                            
                        </div>
                   </div>
                </div>
            </div>
        </>
    )
}
export default Premiem