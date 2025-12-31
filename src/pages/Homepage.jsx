import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faComments, faDotCircle, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons'
import Header2 from './Header2'
import { allblogAPI, reportblogAPI } from '../server/Allapi'
import { toast } from 'react-toastify'
import { FaEllipsisH, FaSmile } from "react-icons/fa";

function Homepage() {
  
    const [option, setoption] = useState(false)
    const [reportReason, setReportReason] = useState("");
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState("");
    const [commentbox, setCommentbox] = useState(false)
    const [replayopen, setReplyopen] = useState(false)
    const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Please tell us about your issue." }
  ]);




    const [allBlog, setAllBlog] = useState([])

    const [expanded, setExpanded] = useState({}); // track expanded state per blog
    const [activeMenu, setActiveMenu] = useState(); // which menu dots are active
    const [reportOpen, setReportOpen] = useState(null); // which blog report is open

    const toggleReadMore = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index], // toggle only this blog
        }));
    };

    const [token, setToken] = useState('')
    console.log(token);

    // get all blogs
    const allblog = async (searchKey, token) => {

        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        const result = await allblogAPI(searchKey, reqHeader)
        console.log(result.data);

        setAllBlog(result.data)


    }

    const submitReport = async () => {
        if (!reportReason) {
            alert("Please enter a reason for reporting");

            return;
        }

        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const blogId = allBlog[reportOpen]?._id; // get the current blog's id

        try {
            const res = await reportblogAPI(headers, blogId, { reason: reportReason });
            if (res?.status === 201) {
                alert("Reporting successfull")
            } else {
                alert(res.response?.data || "Failed to submit report");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }

        // Close modal and reset
        setReportOpen(null);
        setReportReason("");
    };
    useEffect(() => {
        const t = sessionStorage.getItem('token')
        setToken(t)
        if (t) {
            allblog("", t); // fetch all blogs on page load
        }


    }, [])


    return (
        <>
            <div>
                <Header2 />

                <div>
                    <div className='fixed left-0 mt2 top-0 h-screen w-[250px]'>
                        <Sidebar />
                    </div>

                    <div>
                        <div className="flex flex-wrap ml-70 ">
                            {allBlog.map((item, index) => (
                                <div key={index} className="relative bg-white border rounded-4xl mb-10 ml-20  mt-6" style={{ width: "460px", height: expanded[index] ? "auto" : "520px" }}>

                                    {/* Menu Dots */}
                                    <div className="flex flex-col items-end mt-4 mr-4">
                                        {[...Array(3)].map((_, dotIndex) => (
                                            <FontAwesomeIcon
                                                key={dotIndex}
                                                onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                                                style={{ height: "4px", cursor: "pointer" }}
                                                icon={faDotCircle}
                                            />
                                        ))}
                                    </div>

                                    {/* Report Button */}
                                    {activeMenu === index && (
                                        <div style={{ marginTop: "-20px" }} className="absolute border ml-110 top-10 z-50">
                                            <div
                                                onClick={() => setReportOpen(index)}
                                                className="flex items-center border bg-white  px-3 py-1  shadow-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faCircleExclamation} className="text-lg" />
                                                <h2 className="text-sm font-semibold">Report</h2>
                                            </div>
                                            <div

                                                className="flex items-center px-3 py-1 border  bg-white  shadow-lg cursor-pointer hover:bg-amber-100 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faMessage} className="text-lg" />
                                                <h2 className="text-sm font-semibold">message</h2>
                                            </div>
                                            <div

                                                className="flex items-center px-3 py-1 border  bg-white  shadow-lg cursor-pointer hover:bg-blue-100 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="text-lg" />
                                                <h2 className="text-sm font-semibold">Follow</h2>
                                            </div>
                                            <div

                                                className="flex items-center px-3 py-1 border  bg-white  shadow-lg cursor-pointer hover:bg-blue-100 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faComments} className="text-lg" />
                                                <h2 onClick={() => setCommentbox(true)} className="text-sm font-semibold">Comments</h2>
                                            </div>
                                        </div>
                                    )}

                                    {/* Blog Content */}
                                    <div className="overflow-hidden transition-all duration-500 overflow-y-auto p-5">
                                        <img
                                            className="rounded-2xl"
                                            style={{ height: "200px", width: "100%" }}
                                            src={
                                                item.uploadimg && item.uploadimg.length > 0
                                                    ? `http://localhost:4000/upload/${item.uploadimg[0]}`
                                                    : "https://adventure-pulse.com/wp-content/uploads/2025/02/Yunam-Peak-Adventure-Pulse-2.jpg"
                                            }
                                            alt={item.title || "no image"}
                                        />

                                        <h1 className="font-bold text-2xl text-center mt-4">{item.title || "No Title"}</h1>

                                        <p className="text-justify px-10 text-sm mt-5">
                                            {expanded[index] ? item.content : item.content.split("\n").slice(0, 1).join("\n")}
                                        </p>

                                        {item.content.split("\n").length > 2 && (
                                            <p
                                                onClick={() => toggleReadMore(index)}
                                                className="text-blue-400 hover:text-green-400 cursor-pointer mt-3 text-right"
                                            >
                                                {expanded[index] ? "Show less" : "Read more"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------------- Report Modal ---------------- */}
                {reportOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]'>
                        <div className='bg-white shadow-xl rounded-2xl p-6 w-[400px]'>
                            <h2 className='text-xl font-bold text-center mb-4'>Report Content</h2>

                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}

                                placeholder="Write your report..."
                                className='w-full h-32 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400'
                            />

                            <div className='flex justify-between mt-4'>
                                <button
                                    className='bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500'
                                    onClick={() => setReportOpen(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
                                    onClick={submitReport}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    {commentbox && <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
                        <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-4 relative">

                            {/* Header */}
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-lg font-semibold">Comments</h2>
                                <button onClick={() => setCommentbox(false)} className="text-gray-500 text-xl">×</button>
                            </div>
                            {option && <div className='ml-140 bg-white border w-25 '>
                                <button className=' ml-2 '><b>delete</b></button>
                                <hr />
                                <button className=' ml-4'><b>edit</b></button>
                            </div>}

                            {/* Comment */}
                            <div className="flex gap-3 mt-4">
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                                    A
                                </div>


                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold">Liam Rubicorn</h4>

                                        </div>
                                        <FaEllipsisH onClick={() => setoption(prev => !prev)} className="text-gray-400 cursor-pointer" />
                                    </div>

                                    <p className="mt-2 text-gray-700">
                                        A better understanding of usage can aid in prioritizing future
                                        efforts i'm sorry I replied to your emails after only three weeks
                                    </p>

                                    {/* Reply button */}
                                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                        <button onClick={() => setReplyopen(true)} className="font-medium hover:text-purple-600">
                                            REPLY
                                        </button>

                                    </div>

                                    {/* Reply input */}
                                    {replayopen && <div className="relative mt-3">
                                        <input
                                            type="text"
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            placeholder="Enter your comment"
                                            className="w-full border rounded-lg px-4 py-2 pr-20 focus:outline-purple-500"
                                        />
                                        <div className="absolute right-3 top-2.5 flex items-center gap-2">
                                            <FaSmile className="text-gray-400 cursor-pointer" />
                                            <button className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm">
                                                Send
                                            </button>
                                        </div>
                                    </div>}
                                </div>
                            </div>

                            {/* New Comment Input */}
                            <div className="relative mt-6">
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter your comment"
                                    className="w-full border rounded-lg px-4 py-2 pr-20 focus:outline-purple-500"
                                />
                                <div className="absolute right-3 top-2.5 flex items-center gap-2">
                                    <FaSmile className="text-gray-400 cursor-pointer" />
                                    <button
                                        disabled={!comment}
                                        className={`px-3 py-1 rounded-md text-sm ${comment
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <button
                        onClick={() => setOpen(!open)}
                        className="fixed bottom-6 right-6 bg-black text-white w-14 h-14 rounded-full shadow-lg text-xl"
                    >
                        💬
                    </button>

                    {/* Chat Box */}
                    {open && (
                        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col">

                            {/* Header */}
                            <div className="bg-black text-white p-4 rounded-t-2xl flex justify-between items-center">
                                <h3 className="font-semibold">Issue Support</h3>
                                <button onClick={() => setOpen(false)}>✖</button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`px-4 py-2 rounded-xl max-w-xs text-sm ${msg.sender === "user"
                                                    ? "bg-black text-white rounded-br-none"
                                                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}

                                {/* Issue Category Buttons */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {["Technical Issue", "Payment Issue", "Upload Issue", "Other"].map(
                                        (item, i) => (
                                            <button
                                                key={i}
                                                className="px-3 py-1 text-xs border rounded-full hover:bg-black hover:text-white transition"
                                            >
                                                {item}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Input */}
                            <div className="p-3 border-t flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Describe your issue..."
                                    className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                                />
                                <button className="bg-black text-white px-4 py-2 rounded-full">
                                    Send
                                </button>
                            </div>
                        </div>
                    )}


                </div>



            </div>
        </>
    )
}

export default Homepage
