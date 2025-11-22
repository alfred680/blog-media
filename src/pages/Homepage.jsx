import React, { useState } from 'react'
import Sidebar from './Sidebar'

function Homepage() {
    const [open, setopen] = useState(false)
    // const shorttext=fulltext.substring(0,120)
    // const fulltext=data.paragraph
    return (
        <>
            <div>

                <div className='grid grid-cols-5'>
                    <div className='fixed left-0 top-0 h-screen w-[250px]'>
                        <Sidebar />
                    </div>

                    <div>
                        <div className=' h-screen border rounded-4xl overflow-hidden transition-all duration-500 mt-[250px]  overflow-y-auto p-5' style={{ marginLeft: "320px", marginTop: "80px", height: open ? "auto" : "400px", width: "500px" }}>
                            <img className='rounded-2xl' style={{ height: "200px", width: "460px", marginLeft: "20px", marginTop: "20px" }} src="https://adventure-pulse.com/wp-content/uploads/2025/02/Yunam-Peak-Adventure-Pulse-2.jpg" alt="no image" />

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

                                    The climb had been hard. But the mountain had given her something no city ever could—a sense of how powerful she truly was.</p>
                            )}
                            <p onClick={() => setopen(!open)} className='text-blue-400 hover:text-green-400' style={{ marginLeft: "400px" }}>{open ? "Show less" : "Read more"}</p>

                        </div>
                        
                    </div>
                </div>

            </div>
        </>

    )
}

export default Homepage