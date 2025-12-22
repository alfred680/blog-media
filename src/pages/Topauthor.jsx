import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faDotCircle } from '@fortawesome/free-solid-svg-icons'

function Topauthor() {
    const [open, setopen] = useState(false)
    const [option, setoption] = useState(false)
    const [opens, setopens] = useState(false)
    const [openin, setopening] = useState(false)
    const [isPremium, setIsPremium] = useState(false)
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]))
            setIsPremium(payload.isPremium)
        }
    }, [])

    return (
        <>
            <div>


                <div className=' '>
                    <div className='fixed left-0 mt2  top-0 h-screen w-[250px]'>
                        <Sidebar />
                    </div>
                    {isPremium ? (
                        <div className='bg-[]'>

                            <div className='flex flex-wrap'>

                                <div className=' bg-wh border  ml-70' style={{ marginLeft: "", height: open ? "auto" : "420px", width: "1200px", marginTop: option ? "60px" : "60px" }}>


                                    <div className=' flex  overflow-hidden transition-all duration-500   overflow-y-auto p-5'>

                                        <img className='' style={{ height: "360px", width: "auto", marginLeft: "0px", marginTop: "" }} src="https://img.freepik.com/free-photo/smiling-businessman-using-laptop-contemplating-while-working-his-desk-office_637285-732.jpg?semt=ais_hybrid&w=740&q=80" alt="no image" />

                                        <div className='flex-col'>
                                            <h1 className='font-bold text-2xl' style={{ marginTop: "10px", marginLeft: "40px" }}>The Chai Seller Who Built a National Brand</h1>
                                            <p className='text-justify' style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "12px", marginTop: "20px" }}>Raghav grew up in a small town where his father ran a modest chai stall near the busy bus stand. The stall barely earned enough to cover their daily expenses, and most of Raghav’s childhood was spent washing glasses, chopping ginger, and serving steaming cups of tea. Even though life was tough, he was a curious learner who often wondered how big businesses were built from scratch. While other kids dreamed of bikes and cricket bats, Raghav dreamed of creating something that could change his family’s future. But after his father fell ill, those dreams were pushed aside as he dropped out of college and took full responsibility for the stall.

                                                Even as he ran the small shop, the thought kept repeating in his mind: “Chai is India’s heartbeat—why can’t it be branded?” Whenever he shared this idea with people, they laughed, telling him that chai was too ordinary, too common to become a real brand. But Raghav believed that the most common things often have the most potential.  </p>
                                            {open && (
                                                <p className='text-justify' style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "12px", marginTop: "20px" }} >His turning point arrived one rainy evening when a group of tourists stopped at the stall and loved his unique masala chai. They jokingly suggested that he should bottle it and sell it. For everyone else, it was a joke; for Raghav, it was a spark.

                                                    He spent that night writing down ideas in a worn-out notebook—flavors, packaging, pricing, and a name: “Desi Cup.” With barely any savings, he borrowed ₹8,000 from a friend and bought a few bottles, labels, and ingredients. Using an old computer at a cyber café, he created a simple logo. With a second-hand bicycle and unlimited determination, he started selling bottled chai to students in hostels and employees outside office buildings. At first, people were doubtful, but slowly his innovative flavors—like ginger mint, masala strong, and chocolate chai—began gaining attention. Word spread quickly, especially among young people who loved trying something new.

                                                    As demand grew, Raghav expanded production from his home kitchen to a small rented room, hired two helpers, and set up a tiny delivery network. His big breakthrough came when a student posted a short video titled “The Small-Town Boy Who Branded Chai.” The video went viral, gaining millions of views. Overnight, Desi Cup became a sensation. Orders doubled, cafés requested to stock his chai, and investors showed interest. Within a year, he opened his first official Desi Cup outlet, followed by several more in neighboring cities.

                                                    Four years later, Desi Cup became a recognized chai brand with over a hundred outlets across the country. Raghav eventually returned to his father’s old stall—now renovated and bustling with customers. Standing outside, he realized how far he had come—from a boy washing glasses at a roadside shop to the owner of a nationwide chai brand. His journey proved that success does not depend on background or wealth, but on vision, courage, and the willingness to try something others believe is impossible.
                                                </p>

                                            )}
                                            <div className='flex mt-4 ml-10'>
                                                <img className='rounded-full ' style={{ height: "20px", width: "auto" }} src="https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3V5fGVufDB8fDB8fHww" alt="no image" />
                                                <h1 className='ml-2 mb-2'>Raghav R</h1>
                                                <p onClick={() => setopen(!open)} className='text-blue-400 hover:text-green-400' style={{ marginLeft: "340px" }}>{open ? "Show less" : "Read more"}</p>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                                <div className='flex'>
                                    <div className=' bg-wh border  ml-70' style={{ marginLeft: "", height: opens ? "auto" : "500px", width: "540px", marginTop: option ? "20px" : "20px", marginBottom: "20px" }}>


                                        <div className=' overflow-hidden transition-all duration-500   overflow-y-auto p-5'>

                                            <img className='' style={{ height: "280px", width: "470px", marginLeft: "16px", marginTop: "" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdF9YRdrQfe-_S4f1ThWEVkRRHr4UFZxgDIqC7lZJcSyZismbtcMfGp1fErv7s71WpohM&usqp=CAU" alt="no image" />

                                            <h1 className='font-bold text-2xl' style={{ marginTop: "10px", marginLeft: "10px" }}>The Journey of Aanya, the Fashion Dreamer</h1>
                                            <p className='text-justify' style={{ paddingLeft: "10px", paddingRight: "10px", fontSize: "12px", marginTop: "20px" }}>Aanya grew up in a crowded neighborhood where most people believed in “safe” careers—engineering, medicine, or government jobs. But Aanya was different. </p>
                                            {opens && (
                                                <p className='text-justify' style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "12px", marginTop: "20px" }} >   From childhood, she stitched tiny dresses for her dolls using leftover cloth pieces her mother collected from a nearby tailor shop. While everyone thought it was just a hobby, Aanya felt something deeper every time she held a needle and thread. Her dream was simple yet bold: to become a fashion designer known for turning ordinary fabrics into extraordinary designs.But dreams don’t come easy. Her family struggled financially, and professional design education was too expensive. When Aanya told her relatives she wanted to be a designer, they laughed and said, “Fashion designing is only for the rich.” Instead of giving up, she started learning through free online videos, practicing late into the night using a second-hand sewing machine she bought with her savings from tutoring kids in her neighborhood.

                                                    Her turning point came during a college fest when she participated in a small fashion competition. She created a dress entirely from recycled newspapers and leftover cloth—something unique, bold, and full of personality. The audience loved it, and she won first prize. A local boutique owner who attended the event noticed her talent and asked her to design a few trial pieces. Aanya poured her heart into those designs, mixing Indian traditions with modern cuts, creating styles that felt fresh and unforgettable.

                                                    The boutique’s customers loved her work, and soon orders started increasing. But Aanya wanted more—she wanted her own brand. With almost no money, she began her journey by stitching outfits at home and promoting them on social media. At first, her posts got only a few likes, but gradually, people began noticing her creativity. One day, a popular influencer posted a picture wearing her handcrafted lehenga with the caption:
                                                    “Designed by a young talent—Aanya Couture.”

                                                    That one post changed everything.

                                                    Within weeks, her page exploded with followers, orders poured in from different cities, and she received her first big opportunity—a chance to showcase her collection at a local fashion show. She worked tirelessly, creating a line inspired by her childhood: fabrics stitched together like the scraps she once used, but now transformed into luxurious, breathtaking outfits. The show was a massive hit. Designers, stylists, and even celebrities began reaching out to her.

                                                    Five years later, Aanya launched her own boutique and online store, Aanya Couture, known for its unique blend of tradition, sustainability, and modern style. From stitching doll dresses in a tiny room to dressing models, brides, and celebrities, she became a symbol of passion and perseverance. Standing on the stage at her first international fashion week, she remembered her journey—from borrowing fabric scraps to building a fashion brand loved across the world.
                                                </p>
                                            )}
                                            <div className='flex mt-4 ml-2'>
                                                <img className='rounded-full ' style={{ height: "20px", width: "auto" }} src="https://i.pinimg.com/736x/84/e0/11/84e01165c6fb567822257eeaeb7c17b9.jpg" alt="no image" />
                                                <h1 className='ml-2 mb-2'>Aanya Mathews</h1>
                                                <p onClick={() => setopens(!opens)} className='text-blue-400 hover:text-green-400' style={{ marginLeft: "180px" }}>{opens ? "Show less" : "Read more"}</p>

                                            </div>

                                        </div>

                                    </div>
                                    <div className=' bg-wh border  ml-14' style={{ marginLeft: "", height: openin ? "auto" : "500px", width: "600px", marginTop: option ? "20px" : "20px", marginBottom: "20px" }}>


                                        <div className=' overflow-hidden transition-all duration-500   overflow-y-auto p-5'>

                                            <img className='' style={{ height: "280px", width: "auto", marginLeft: "10px", marginTop: "" }} src="https://imgix.ranker.com/list_img_v2/11859/1871859/original/1871859-u1" alt="no image" />

                                            <h1 className='font-bold text-2xl' style={{ marginTop: "10px", marginLeft: "10px" }}>The Unstoppable Athlete: The Story of Arjun</h1>
                                            <p className='text-justify' style={{ paddingLeft: "20px", paddingRight: "20px", fontSize: "12px", marginTop: "20px" }}>Arjun was born with a physical disability in his right leg, and doctors told his parents he might never run properly. While other children raced freely in the playground </p>
                                            {openin && (
                                                <p className='text-justify' style={{ paddingLeft: "10px", paddingRight: "10px", fontSize: "12px", marginTop: "20px" }} > Arjun often sat on the side, watching with a quiet ache in his heart. But what he lacked in physical strength, he made up for in determination.He refused to accept that he was “less capable,” and every day he pushed himself a little more—first walking without support, then jogging slowly, and finally trying to run despite the pain.

                                                    One afternoon, during a school sports event, Arjun saw other kids preparing for a 100-meter race. Something inside him sparked. Ignoring everyone’s doubts, he stepped onto the track. The moment the whistle blew, he ran with all his heart. He did not win, but as he crossed the finish line, the entire ground erupted in applause—not because he came first, but because he refused to give up. That day, Arjun discovered what he truly loved: para-athletics.

                                                    His journey was far from easy. Training was painful, expensive, and sometimes discouraging. But Arjun showed up every single day. He practiced in worn-out shoes, used old equipment, and traveled long distances to his coach because he couldn’t afford anything better. Eventually, he received a specially designed prosthetic support, and with it he trained twice as hard. Every setback only made him stronger.

                                                    At his first national para-athletics championship, Arjun competed in the 200-meter sprint. As he stood on the track, he remembered every struggle—every fall, every bruise, every comment that said he couldn’t. The whistle blew, and Arjun launched forward like lightning. When he crossed the finish line, he realized he had not just completed the race… he had won gold.

                                                    From that moment on, Arjun became a symbol of courage. He represented India at international events, earning medals, respect, and admiration. Whenever people asked him how he did it, his answer was simple:
                                                    “My disability is not my weakness—it is my superpower. It taught me how strong I truly am.”
                                                </p>
                                            )}
                                            <div className='flex mt-4 ml-4'>
                                                <img className='rounded-full ' style={{ height: "20px", width: "auto" }} src="https://png.pngtree.com/thumb_back/fh260/background/20250423/pngtree-a-cute-korean-high-school-boy-with-short-hair-wearing-plaid-image_17224762.jpg" alt="no image" />
                                                <h1 className='ml-2 mb-2'>Arjun Samo</h1>
                                                <p onClick={() => setopening(!openin)} className='text-blue-400 hover:text-green-400' style={{ marginLeft: "280px" }}>{openin ? "Show less" : "Read more"}</p>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>




                        </div>
                    ) : (
                        <div className="ml-80 mt-40 text-center">
                            <h1 className="text-2xl font-bold text-red-500">
                                Please Buy Premium 
                            </h1>
                            <div className='w-50 ml-126 mt-10'>
                                <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" />
                            </div>
                            <p className="mt-10 text-gray-600">
                                This content is available for premium users only.
                            </p>
                        </div>
                    )}
                </div>

            </div>

        </>

    )
}

export default Topauthor