import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import Header2 from './Header2'
import { allblogAPI, reportblogAPI } from '../server/Allapi'
import { toast } from 'react-toastify'

function Homepage() {
    const [open, setopen] = useState(false)
    const [option, setoption] = useState(false)
    const [reportReason, setReportReason] = useState("");


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
                                        <div className="absolute top-10 right-4 z-50">
                                            <div
                                                onClick={() => setReportOpen(index)}
                                                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-xl shadow-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faCircleExclamation} className="text-lg" />
                                                <h2 className="text-sm font-semibold">Report</h2>
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

            </div>
        </>
    )
}

export default Homepage
