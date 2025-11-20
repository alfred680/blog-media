import React from 'react'
import image2 from "../image/image2.png"
import '../landing.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Landing() {
  return (
    <>
      <Header />
      <div>
        <section>
          <div className="flex flex-col items-center justify-center  text-center p-4">

            <h1 style={{ marginTop: "100px" }} className="text-5xl md:text-6xl font-bold mb-10">
              Every moment has a story
              <br />write yours
            </h1>


            <img
              src={image2}
              alt="no image"
              className="w-screen max-w-4xl mx-auto"
            />

            <button className="btn glitch">
              <span>Get Start</span>
            </button>

          </div>
        </section>
        <section>
          <div >

            <h1 className='flex flex-col items-center justify-center font-bold' style={{ marginTop: "50px", fontSize: "30px" }}>Quotes</h1>
            <div className='w-screen '>
              <div className='flex  justify-between '>
                <div className='rounded-3xl shake-strong transition-transform duration-300 hover:scale-105 hover:shadow-2xl' style={{ height: "480px", backgroundColor: "#EBE3FF", width: "400px", marginTop: "60px", marginLeft: "200px" }}>
                  <h1 style={{ fontFamily: "Roboto" }} className='-mt-10 text-3xl text-center font-bold'><br /></h1>
                  <img style={{ marginLeft: "50px", marginTop: "20px", height: "200px", width: "auto" }} src="https://img.freepik.com/free-photo/crop-woman-making-notes-near-camera-breakfast-food_23-2147911477.jpg?semt=ais_incoming&w=740&q=80" alt="no image" />
                  <p style={{ fontFamily: "Roboto", marginLeft: "70px", marginTop: "20px" }}><b><i>Every story begins with a heartbeat of curiosity</i></b> <br /><span style={{ marginLeft: "160px" }}>— Liam Rivera</span> </p>

                </div>

                <div className='rounded-3xl shake-strong transition-transform duration-300 hover:scale-105 hover:shadow-2xl' style={{ height: "220px", backgroundColor: "#FFEDFD", width: "700px", marginTop: "60px", marginRight: "200px" }}>
                  <div className='flex '>
                    <div className='flex '>

                      <h1 style={{ fontFamily: "Roboto", marginLeft: "40px", marginTop: "40px" }} className='-mt-10 text-3xl  font-bold'><br /></h1>

                      <img style={{ width: "auto", height: "160px", marginLeft: "20px", marginTop: "40px" }} src="data:image/jpeg;base64,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" alt="no image" />
                      <p style={{ fontFamily: "Roboto", marginLeft: "20px", marginTop: "90px" }}><i> <b>When you write, you create a world that <br /> didn’t exist before</b></i> <span style={{
                        marginLeft: "200px", display: "block",
                        marginTop: "-20px",
                        fontSize: "18px",
                        opacity: 0.8,
                      }}> <br /> — Sofia Hale</span></p>



                    </div>









                  </div>
                  <div className='flex'>
                    <div className='rounded-3xl shake-strong transition-transform duration-300 hover:scale-105 hover:shadow-2xl' style={{ height: "220px", backgroundColor: "#FFFF99", width: "320px", marginTop: "60px", marginLeft: "0px" }}>
                      <h1 style={{ fontFamily: "Roboto" }} className='-mt-10 text-3xl text-center font-bold'><br /></h1>

                      <p className=' text-center' style={{ marginTop: "40px" }}><b><i>Your voice is unique <br /> let it echo through <br />your words</i></b> <br /><span style={{ marginLeft: "120px" }}>— Leo Hart</span> </p>

                    </div>
                    <div className='rounded-3xl shake-strong transition-transform duration-300 hover:scale-105 hover:shadow-2xl' style={{ height: "220px", backgroundColor: "#B3E3B4", width: "320px", marginTop: "60px", marginLeft: "40px" }}>
                      <h1 style={{ fontFamily: "Roboto" }} className='-mt-10 text-3xl text-center font-bold'><br /></h1>

                      <p className=' text-center' style={{ marginTop: "40px" }}><b><i>Blog what you feel someone <br /> out there needs it.</i></b> <br /><span style={{ marginLeft: "120px" }}>— Nova Leigh</span> </p>

                    </div>

                  </div>
                  
                </div>
                
              </div>
             <div className='flex'>
                <div className='rounded-3xl shake-strong transition-transform duration-300 hover:scale-105 hover:shadow-2xl' style={{ height: "400px", backgroundColor: "#FFA86B", width: "600px", marginTop: "40px", marginLeft: "200px" }}>
                    <h1 style={{ fontFamily: "Roboto" }} className='-mt-10 text-3xl text-center font-bold'><br /></h1>
                    <img style={{ marginLeft: "100px", marginTop: "20px", height: "240px", width: "auto" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPT7PJZpuqqm_QZ-sXoXNWFEif13iHLnYtA&s" alt="no image" />
                    <p style={{ fontFamily: "Roboto", marginLeft: "70px", marginTop: "20px" }}><b><i>In every line, there lives a story waiting <br /> to be discovered</i></b> <br /><span style={{ marginLeft: "180px" }}>— Aria Winters</span> </p>
  
                  </div>
                  <div className='rounded-3xl shake-strong transition-transform duration-300 hover:scale-105 hover:shadow-2xl' style={{ height: "400px", backgroundColor: "#DCE3DC", width: "500px", marginTop: "40px", marginLeft: "20px" }}>
                    <h1 style={{ fontFamily: "Roboto" }} className='-mt-10 text-3xl text-center font-bold'><br /></h1>
                    <img style={{ marginLeft: "80px", marginTop: "20px", height: "240px", width: "auto" }} src="https://img.freepik.com/free-photo/flat-lay-travel-concept-with-camera_23-2148666240.jpg?semt=ais_incoming&w=740&q=80" alt="no image" />
                    <p style={{ fontFamily: "Roboto", marginLeft: "70px", marginTop: "20px" }}><b><i>Creativity grows when you let your mind wander freely</i></b> <br /><span style={{ marginLeft: "160px" }}>— Elio Brooks</span> </p>
  
                  </div>
             </div>
            </div>



          </div>

        </section>
        <section>
          <div className='flex flex-col  w-screen '>
            <h1 style={{marginTop:"10px"}} className='text-4xl text-center'>About</h1>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Landing
