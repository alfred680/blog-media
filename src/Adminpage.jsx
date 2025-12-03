import { faDotCircle, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import AdminHeader from './AdminHeader';

function Adminpage() {
    const [allblogs, setallblog] = useState(true)
    const [request, setrequest] = useState(false)
    const [subscrition,setsubscrition]=useState(false)

    const [open, setopen] = useState(false)
    const [option, setoption] = useState(false)
    return (
       <div>
            <AdminHeader/>
            <div style={styles.container}>
    
    
    
                <div style={styles.headerArea}>
    
                    <div style={styles.banner}>
                        <div style={styles.layer1}></div>
                        <div style={styles.layer2}></div>
                        <div style={styles.layer3}></div>
                    </div>
    
    
                    <div style={styles.avatarWrapper}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfebdrptqMREDrJhYbQvT0dpgQ3G0r1NkYVQ&s"
                            alt="profile"
                            style={styles.avatarImage}
                        />
    
                    </div>
    
                    <h1 style={styles.userName}>Admin</h1>
                </div>
    
    
                <div className='flex gap-18 justify-center font-bold bg-white p-5 mb-10' style={{ fontFamily: "Playfair Display", marginTop: "-30px" }}>
                    <h1 onClick={() => { setallblog(true), setrequest(false) ,setsubscrition(false) }} className={allblogs ? 'cursor-pointer text-white rounded-4xl border p-2 px-4 bg-black' : "rounded-4xl border p-2 px-4"} >All Blogs</h1>
                    <h1 onClick={() => { setallblog(false), setrequest(true), setsubscrition(false) }} className={request ? 'cursor-pointer text-white rounded-4xl border p-2 px-4 bg-black' : 'rounded-4xl border p-2 px-4'} >Request</h1>
                    <h1 onClick={() => { setallblog(false), setrequest(false),setsubscrition(true) }} className={subscrition ? 'cursor-pointer text-white rounded-4xl border p-2 px-4 bg-black' : 'rounded-4xl border p-2 px-4'}  >Subscription</h1>
    
    
    
                </div>
                {option && (
                    <div
                        className="absolute mt-10 ml-136 w-40 bg-white border rounded-xl shadow-lg 
                         animate-slideDown z-10"
                    >
                        <ul className="py-2 text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <div className="flex">
                                    <FontAwesomeIcon className="mt-1" icon={faTrash} />
                                    <p className=" ms-4 font-bold"> Delete</p>
                                </div>
                            </li>
                            <hr />
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <div className="flex">
                                    <FontAwesomeIcon className="mt-1" icon={faPenToSquare} />
                                    <p className="ms-4 font-bold" >Edit</p>
                                </div>
    
                            </li>
    
                        </ul>
                    </div>)}
    
                {allblogs && <div>
                    <div className=' border rounded-4xl ml-10 mt-10 mb-10' style={{ marginLeft: "", height: open ? "auto" : "420px", width: "500px", marginTop: "" }}>
                        <div className='flex flex-col items-end' style={{ marginRight: "10px", marginTop: "6px" }}>
                            <FontAwesomeIcon onClick={() => setoption(true)} style={{ height: "7px" }} icon={faDotCircle} />
                            <FontAwesomeIcon onClick={() => setoption(true)} style={{ height: "7px" }} icon={faDotCircle} />
                            <FontAwesomeIcon onClick={() => setoption(!option)} style={{ height: "7px" }} icon={faDotCircle} />
                        </div>
                        <div className='flex flex-col items-end' style={{ marginRight: "10px", marginTop: "6px" }}>
    
                        </div>
    
                        <div className=' overflow-hidden transition-all duration-500   overflow-y-auto p-5'>
    
                            <img className='rounded-2xl' style={{ height: "200px", width: "460px", marginLeft: "0px" }} src="https://adventure-pulse.com/wp-content/uploads/2025/02/Yunam-Peak-Adventure-Pulse-2.jpg" alt="no image" />
    
                            <h1 className='font-bold text-2xl' style={{ marginTop: "10px", marginLeft: "40px" }}>Above the Clouds in Himachal</h1>
                            <p className='text-justify' style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "12px", marginTop: "20px" }}>On the first day, she realized climbing a mountain wasn’t like walking on a road. Her legs burned, her backpack felt heavier with every step, and her breath came out in small clouds. </p>
                            {open && (
                                <p className='text-justify' style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "12px", marginTop: "20px" }} >  “Slow and steady,” he said. “Mountains don’t like rush.”
    
                                    By the second day, the forest opened into huge meadows. Horses grazed freely, streams danced across rocks, and the air felt cleaner than anything Riya had ever breathed. She started to enjoy the climb.
    
                                    But on the final stretch to the pass, a sudden fog rolled in. The trail disappeared. The wind howled. Riya froze—every horror story she’d ever heard suddenly felt real.
    
                                    Tenzin walked back to her, placed a warm hand on her shoulder, and pointed upward.
                                    “Look. Even in the fog, you can see the way.”
    
                                    She looked carefully. The rocks had faint white markings left by trekkers before them. Slowly, step by step, she followed the marks until the ground suddenly leveled.
    
                                    They had reached Hampta Pass.
    
                                    When the fog parted, she gasped. Peaks rose in every direction, sharp and silent, floating above a blanket of clouds. She felt tiny—yet stronger than ever.
    
                                    Tenzin smiled. “Your first pass. How does it feel?”
    
                                    Riya closed her eyes, letting the cold wind hit her face.
                                    “Like I finally met a version of myself I didn’t know existed.”
    
                                    The climb had been hard. But the mountain had given her something no city ever could—a sense of how powerful she truly was.
                                </p>
                            )}
                            <p onClick={() => setopen(!open)} className='text-blue-400 hover:text-green-400' style={{ marginLeft: "360px" }}>{open ? "Show less" : "Read more"}</p>
    
                        </div>
    
                    </div>
                </div>}
    
                <div className=''>
                    {option && (
                        <div
                            className="absolute mt-10 ml-136 w-40 bg-white border rounded-xl shadow-lg 
                         animate-slideDown z-10"
                        >
                            <ul className="py-2 text-gray-700">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <div className="flex">
                                        <FontAwesomeIcon className="mt-1" icon={faTrash} />
                                        <p className=" ms-4 font-bold"> Delete</p>
                                    </div>
                                </li>
                                <hr />
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <div className="flex">
                                        <FontAwesomeIcon className="mt-1" icon={faPenToSquare} />
                                        <p className="ms-4 font-bold" >Edit</p>
                                    </div>
    
                                </li>
    
                            </ul>
                        </div>)}
    
                    {request && <div>
                        <div className=' border rounded-4xl ml-10 mt-10 mb-10' style={{ marginLeft: "", height: open ? "auto" : "420px", width: "500px", marginTop: "" }}>
                            <div className='flex flex-col items-end' style={{ marginRight: "10px", marginTop: "6px" }}>
                                <FontAwesomeIcon onClick={() => setoption(true)} style={{ height: "7px" }} icon={faDotCircle} />
                                <FontAwesomeIcon onClick={() => setoption(true)} style={{ height: "7px" }} icon={faDotCircle} />
                                <FontAwesomeIcon onClick={() => setoption(!option)} style={{ height: "7px" }} icon={faDotCircle} />
                            </div>
                            <div className='flex flex-col items-end' style={{ marginRight: "10px", marginTop: "6px" }}>
    
                            </div>
    
                            <div className=' overflow-hidden transition-all duration-500   overflow-y-auto p-5'>
    
                                <img className='rounded-2xl' style={{ height: "200px", width: "460px", marginLeft: "0px" }} src="https://adventure-pulse.com/wp-content/uploads/2025/02/Yunam-Peak-Adventure-Pulse-2.jpg" alt="no image" />
    
                                <h1 className='font-bold text-2xl' style={{ marginTop: "10px", marginLeft: "40px" }}>Above the Clouds in Himachal</h1>
                                <p className='text-justify' style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "12px", marginTop: "20px" }}>On the first day, she realized climbing a mountain wasn’t like walking on a road. Her legs burned, her backpack felt heavier with every step, and her breath came out in small clouds. </p>
                                {open && (
                                    <p className='text-justify' style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "12px", marginTop: "20px" }} >  “Slow and steady,” he said. “Mountains don’t like rush.”
    
                                        By the second day, the forest opened into huge meadows. Horses grazed freely, streams danced across rocks, and the air felt cleaner than anything Riya had ever breathed. She started to enjoy the climb.
    
                                        But on the final stretch to the pass, a sudden fog rolled in. The trail disappeared. The wind howled. Riya froze—every horror story she’d ever heard suddenly felt real.
    
                                        Tenzin walked back to her, placed a warm hand on her shoulder, and pointed upward.
                                        “Look. Even in the fog, you can see the way.”
    
                                        She looked carefully. The rocks had faint white markings left by trekkers before them. Slowly, step by step, she followed the marks until the ground suddenly leveled.
    
                                        They had reached Hampta Pass.
    
                                        When the fog parted, she gasped. Peaks rose in every direction, sharp and silent, floating above a blanket of clouds. She felt tiny—yet stronger than ever.
    
                                        Tenzin smiled. “Your first pass. How does it feel?”
    
                                        Riya closed her eyes, letting the cold wind hit her face.
                                        “Like I finally met a version of myself I didn’t know existed.”
    
                                        The climb had been hard. But the mountain had given her something no city ever could—a sense of how powerful she truly was.
                                    </p>
                                )}
                                <p onClick={() => setopen(!open)} className='text-blue-400 hover:text-green-400' style={{ marginLeft: "360px" }}>{open ? "Show less" : "Read more"}</p>
    
                            </div>
    
                        </div>
                    </div>}
    
    
                </div>
                {subscrition && <div>
                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden" >
                        <thead className="bg-gray-200 ">
                            <tr >
                                <th className="px-4 py-2 text-left font-bold ">Name</th>
                                <th className="px-4 py-2 text-left font-bold">plan</th>
                                <th className="px-4 py-2 text-left font-bold">Date</th>
                                <th className="px-4 py-2 text-left font-bold">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <th className="px-4 py-2 mr-20 font-bold text-left" >Mark</th>
                                <td className="px-4 py-2 font-bold">Standard</td>
                                <td className="px-4 py-2 font-bold">21/5/26</td>
                                <td className="px-4 py-2 font-bold"> $ 700</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>}
            </div>
       </div>
    );
};




const styles = {
    container: {
        backgroundColor: '#f8f8f8',
       
        borderRadius: '10px',
        maxWidth: '100%',
        margin: 'auto',
        fontFamily: 'sans-serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },

    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#333',
    },

    profileTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        fontWeight: '600',
        color: '#333',
    },

    headerArea: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '0 20px 20px 20px',
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },


    banner: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '150px',
        overflow: 'hidden',
        borderRadius: '15px 15px 0 0',
    },
    layer1: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#004d40',
        clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
    },
    layer2: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#00897b',
        clipPath: 'polygon(0 0, 50% 0, 80% 80%, 0% 100%)',
        opacity: 0.8,
    },
    layer3: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#90caf9',
        clipPath: 'polygon(0 0, 40% 0, 70% 30%, 0% 60%)',
        opacity: 0.9,
    },



    avatarWrapper: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '4px solid #fff',
        marginTop: '100px',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        display: 'block',
    },

    cameraIcon: {
        position: 'absolute',
        bottom: '0',
        right: '0',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '5px',
        fontSize: '12px',
        lineHeight: '1',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        zIndex: 11,
    },

    userName: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '10px 0 0 0',
        color: '#333',
    },



    navButton: {
        background: 'none',
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '8px 15px',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#555',
        whiteSpace: 'nowrap',
    },

    navButtonActive: {
        backgroundColor: '#111',
        color: '#fff',
        borderColor: '#111',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
}

export default Adminpage