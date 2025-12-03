import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header2 from "./Header2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faPenToSquare, faPlus, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [editprofile, seteditprofile] = useState(false);
  const [post, setpost] = useState(true)
  const [open, setopen] = useState(false)
  const [option, setoption] = useState(false)
  const [uplod,setuplod]=useState(false)
  const [addpost,setaddpost]=useState(false)




  return (
    <>
      <div className=" top-0 w-screen left-0">
       
      </div>


      <div className="flex">

        <div className="fixed top-0  left-0 h-screen w-[250px]">
          <Sidebar />
        </div>


        <div className="ml-[240px] w-full ">


          <div>
            <img
              className="w-full h-[170px] object-cover rounded-b-xl"
              src="https://coolbackgrounds.imgix.net/72FI1uoNvyy66AU9lmkxD0/29545557828129fd31864cdd486457f4/white-radial-gradient.jpg?w=3840&q=60&auto=format,compress"
              alt="cover"
            />
          </div>


          <div className="flex items-start justify-between px-10 mt-[-70px]">

            <div className="flex gap-6">


              <img
                className="h-[150px] w-[150px] rounded-2xl object-cover border-4 border-white shadow-lg"
                src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"

                alt="profile"
              />

              <div className="mt-20">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">Raji</h1>
                  <span>
                    <img
                      className="h-6"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                      alt="verified"
                    />
                  </span>
                </div>

                <p className="text-gray-600 mt-2 w-[400px]">
                  I’m a passionate blogger
                </p>


                <div className="flex gap-3 mt-4">
                  <button className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-80">
                    Message
                  </button>
                  <button onClick={() => seteditprofile(true)} className="border px-4 py-2 rounded-xl hover:bg-blue-200 transition">

                    Edit Profile

                  </button>
                </div>
              </div>

            </div>


            <div className="flex gap-12 mt-20 mr-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold">0</h2>
                <p className="text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold">0</h2>
                <p className="text-gray-500">Following</p>
              </div>

            </div>
          </div>
          <div className="mt-10 flex">
            <h1 onClick={() => {setpost(true),setuplod(false) }} style={{ fontFamily: "Roboto" }} className={post ? '  px-70 py-1 font-bold cursor-pointer bg-gray-200 rounded-md transition-all duration-200 shadow-md':'ms-80 font-bold   ' }>Posts</h1>
            <h1  style={{ fontFamily: "Roboto" }} onClick={() => {setpost(false),setuplod(true) }}  className={uplod ? ' ms-80 px-70 py-1 font-bold cursor-pointer bg-gray-200 rounded-md transition-all duration-200 shadow-md':'ms-80 font-bold   ' }>Uplod</h1>

          </div>






          <hr className="" />




          {editprofile && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="w-[350px] h-[600px] bg-white shadow-xl rounded-2xl p-6 relative animate-[fadeIn_0.3s_ease]">


                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
                  onClick={() => seteditprofile(false)}
                >
                  ×
                </button>


                <div className="relative w-fit mx-auto mt-6">
                  <img
                    className="rounded-full object-cover"
                    style={{ height: "180px", width: "180px" }}
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"

                    alt="profile"
                  />
                  <label className="cursor-pointer absolute right-2 bottom-2">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-lg bg-white border rounded-full p-2 shadow hover:bg-blue-200"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"

                    />
                  </label>
                </div>


                <div className="mt-6 flex flex-col gap-5">
                  <div>
                    <label className="font-semibold text-gray-700">Name</label>
                    <input
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">Bio</label>
                    <textarea
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 h-[140px] focus:ring-2 focus:ring-blue-300"
                      placeholder="  bio"
                    ></textarea>
                  </div>

                  <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Submit
                  </button>
                </div>

              </div>
            </div>
          )}
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

          {post && <div>
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
         {uplod && <div>

          <div className="ms-10 ">
           <img onClick={()=>setaddpost(true)} className="mt-10 ms-120" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4y4mHujo5wQCxYw-kEua3Aw9Dli5CRsBeGmRR4ca3t0TrLoH4i--6nT-e5D5vaToflHc&usqp=CAU" alt="no image" />
          </div>

          </div>}
          {addpost  && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="w-[350px] h-[540px] bg-white shadow-xl rounded-2xl p-6 relative animate-[fadeIn_0.3s_ease]">


                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
                  onClick={() => setaddpost(false)}
                >
                  ×
                </button>
                




                <div className="mt-6 flex flex-col gap-5">
                  <div>
                    <label className="font-semibold text-gray-700">Title</label>
                    <input
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                      type="text"
                      placeholder=" title"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">Content</label>
                    <textarea
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 h-[140px] focus:ring-2 focus:ring-blue-300"
                      placeholder="  write your blog"
                    ></textarea>
                  </div>
                  <div className="text-gray-400 mb-4 text-center">
                 <label>
                    <FontAwesomeIcon icon={faUpload} className="text-3xl mb-2" />
                    <input className="ml-6" type="file" />
                     
                 </label>
                     </div>

                  <button className="bg-blue-600 text-white py-2 mt-2 rounded-lg hover:bg-blue-700">
                    Submit
                  </button>
                </div>

              </div>
            </div>
          )}



        </div>
      </div>
    </>
  );
}

export default Profile;

