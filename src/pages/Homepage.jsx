import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import Header2 from './Header2'


function Homepage() {
    const [open, setopen] = useState(false)
    const [option, setoption] = useState(false)
    // const shorttext=fulltext.substring(0,120)
    // const fulltext=data.paragraph
    
    return (
        <>
            <div>
                <Header2/>

                <div className=' '>
                    <div className='fixed left-0 mt2  top-0 h-screen w-[250px]'>
                        <Sidebar />
                    </div>

                    <div className='bg-[]'>

                        <div className='flex flex-wrap'>
                            {option && (
                                <div style={{ marginLeft: "800px", marginTop: "" }} className="absolute  z-50 ">

                                    <div
                                        onClick={() => setoption(false)}
                                        className="flex items-center gap-3 bg-red-500 text-white px-4 py-2 
                                                                        rounded-xl shadow-lg cursor-pointer 
                                                     hover:bg-red-600 hover:scale-105 transition-all duration-200 mt-10 mr-8"
                                    >
                                        <FontAwesomeIcon icon={faCircleExclamation} className="text-lg" />
                                        <h2 className="text-lg font-semibold">Report</h2>
                                    </div>

                                </div>
                            )}

                            <div className=' bg-wh border rounded-4xl ml-70' style={{ marginLeft: "", height: open ? "auto" : "420px", width: "500px", marginTop: option ? "60px" : "60px" }}>
                                <div className='flex flex-col items-end' style={{ marginRight: "10px", marginTop: "6px" }}>
                                    <FontAwesomeIcon onClick={() => setoption(true)} style={{ height: "7px" }} icon={faDotCircle} />
                                    <FontAwesomeIcon onClick={() => setoption(true)} style={{ height: "7px" }} icon={faDotCircle} />
                                    <FontAwesomeIcon onClick={() => setoption(!option)} style={{ height: "7px" }} icon={faDotCircle} />
                                </div>

                                <div className=' overflow-hidden transition-all duration-500   overflow-y-auto p-5'>

                                    <img className='rounded-2xl' style={{ height: "200px", width: "460px", marginLeft: "0px", marginTop: "" }} src="https://adventure-pulse.com/wp-content/uploads/2025/02/Yunam-Peak-Adventure-Pulse-2.jpg" alt="no image" />

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
                        </div>




                    </div>
                </div>

            </div>
        </>

    )
}

export default Homepage