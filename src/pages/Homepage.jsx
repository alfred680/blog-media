import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faComments, faDotCircle, faMessage, faPlus } from '@fortawesome/free-solid-svg-icons'
import Header2 from './Header2'
import { addCommentAPI, allblogAPI, deleteCommentAPI, followUserAPI, getCommentsAPI, reportblogAPI, sendingChatbotAPI } from '../server/Allapi'
import { toast, ToastContainer } from 'react-toastify'
import { FaEllipsisH, FaSmile } from "react-icons/fa";
import { userProfileContext } from '../context/ContextShare'
import { useNavigate } from 'react-router-dom'



const predefinedQuestions = [
    
    "How Can I Help You",
    "You Issue Is Reported And Your issue Resove In 48 Hours",
    
];

function Homepage({ blogId }) {
    const [currentBlogId, setCurrentBlogId] = useState(null);
    const [openOptionId, setOpenOptionId] = useState(null);



    const [option, setoption] = useState(false)
    const [reportReason, setReportReason] = useState("");
    const [reportSubmitting, setReportSubmitting] = useState(false);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState("");
    const [commentbox, setCommentbox] = useState(false)
    const [replayopen, setReplyopen] = useState(false)
    const [open, setOpen] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [messages, setMessages] = useState([]);


    const { userProfile, setUserProfile } = useContext(userProfileContext)
    const navigate = useNavigate();





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
    const [profileUser, setProfileUser] = useState(null);

    // get all blogs
    const allblog = async (searchKey, token) => {
        const reqHeader = {
            Authorization: `Bearer ${token}`
        };
        const result = await allblogAPI(searchKey, reqHeader);
        console.log(result.data);

        // Map blogs to ensure author has isFollowing and followersCount (handle missing author)
        const mappedBlogs = (result.data || []).map(blog => ({
            ...blog,
            author: {
                ...(blog.author || {}),
                isFollowing: userProfile?.following?.includes(blog.author?._id) || false,// default false
                followersCount: blog.followersCount ?? 0 // default 0
            }
        }));

        setAllBlog(mappedBlogs);
    };

    const [loadingFollow, setLoadingFollow] = useState(false);

    const handleFollow = async (blogId, index) => {
        try {
            setLoadingFollow(true);
            const reqHeader = { Authorization: `Bearer ${token}` };
            const res = await followUserAPI(blogId, reqHeader); // send blogId

            if (res.status === 200) {
                // update blog author in frontend
                setAllBlog(prev =>
                    prev.map((blog, i) =>
                        i === index
                            ? {
                                ...blog,
                                author: {
                                    ...blog.author,
                                    isFollowing: res.data.followed,
                                    followersCount: res.data.followersCount
                                }
                            }
                            : blog
                    )
                );
                toast.success(res.data.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingFollow(false);
        }
    };


    const [replyText, setReplyText] = useState({});
    const [comments, setComments] = useState([]); // fetched comments



    const loggedUserId = sessionStorage.getItem("userId");
    // get all comments
    const getComments = async (blogId) => {
        if (!blogId) return;
        try {
            const res = await getCommentsAPI(blogId);
            if (res.status === 200) {
                setComments(res.data);
            }
        } catch (err) {
            console.log(err);

        }
    }



    // add comment
    const handleComment = async () => {
        if (!comment.trim()) return;
        if (!currentBlogId) {
            toast.error("Please select a blog first!");
            return;
        }

        try {
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token || sessionStorage.getItem("token")}`
            };

            const res = await addCommentAPI(
                { blogId: currentBlogId, text: comment },
                reqHeader
            );

            if (res.status === 200) {
                toast.success("Comment added");
                setComment("");
                getComments(currentBlogId); // refresh comments
            }
        } catch (err) {
            console.error("Add comment error:", err);
            toast.error("Failed to add comment");
        }
    }
    // delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` };
            await deleteCommentAPI(commentId, reqHeader);

            toast.success("Comment deleted ");
            setComments(activeBlogId);
        } catch (err) {
            toast.error(err.response?.data?.message || "Delete failed");
        }
    }


    // chatbot 
    const handleSendAnswer = async () => {
        if (!answer.trim()) return;

        try {
            const reqHeader = { Authorization: `Bearer ${token}` };
            const res = await sendingChatbotAPI(questionIndex, answer, reqHeader);

            // Add user's answer and question to messages
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: predefinedQuestions[questionIndex] },
                { sender: "user", text: answer }
            ]);

            setAnswer(""); // clear input

            // Move to next question
            if (res.data.nextQuestion) {
                setQuestionIndex(questionIndex + 1);
            } else {
               
                setQuestionIndex(0); // reset for next chat
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error sending answer");
        }
    };





    useEffect(() => {
        getComments();
    }, [blogId]);





    //  submit report
    const submitReport = async () => {
        if (!reportReason || reportReason.trim().length < 5) {
            toast.error("Please enter a reason (at least 5 characters)");
            return;
        }

        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const blogId = allBlog[reportOpen]?._id; // get the current blog's id
        if (!blogId) {
            toast.error("Unable to determine which blog to report");
            return;
        }

        try {
            setReportSubmitting(true);
            const res = await reportblogAPI(headers, blogId, { reason: reportReason });
            if (res?.status === 201) {
                toast.success("Report submitted");
                setReportOpen(null);
                setReportReason("");
            } else {
                const msg = res?.data || res?.response?.data || "Failed to submit report";
                toast.error(msg);
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data || err.message || "Something went wrong";
            toast.error(msg);
        } finally {
            setReportSubmitting(false);
        }
    };
    useEffect(() => {
        const t = sessionStorage.getItem('token')
        setToken(t)
        if (t) {
            allblog("", t); // fetch all blogs on page load
        }


    }, [])
    console.log(comment);



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
                                                onClick={() => { setReportOpen(index); setActiveMenu(null); }}
                                                className="flex items-center border bg-white  px-3 py-1  shadow-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faCircleExclamation} className="text-lg" />
                                                <h2 className="text-sm font-semibold">Report</h2>
                                            </div>
                                            <div

                                                className="flex items-center px-3 py-1 border  bg-white  shadow-lg cursor-pointer hover:bg-amber-100 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faMessage} className="text-lg" />
                                                <h2 onClick={() => navigate(`/inbox/${item._id}`)} className="text-sm font-semibold">message</h2>
                                            </div>
                                            <div
                                                className={`flex items-center px-3 py-1 border bg-white shadow-lg
                                                 ${loadingFollow ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 cursor-pointer"}`}
                                                onClick={() => handleFollow(item.author_id, index)}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                                <h2 className="text-sm font-semibold ml-2">
                                                    {item.author?.isFollowing ? "Unfollow" : "Follow"}
                                                </h2>
                                            </div>


                                            <div

                                                className="flex items-center px-3 py-1 border  bg-white  shadow-lg cursor-pointer hover:bg-blue-100 hover:scale-105 transition-all duration-200"
                                            >
                                                <FontAwesomeIcon icon={faComments} className="text-lg" />
                                                <h2 onClick={() => {
                                                    setCommentbox(true);
                                                    setCurrentBlogId(item._id);
                                                    getComments(item._id);
                                                    setActiveMenu(false)
                                                }} className="text-sm font-semibold">Comments</h2>

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
                                            {expanded[index] ? (item.content ?? '') : (item.content ?? '').split("\n").slice(0, 1).join("\n")}
                                        </p>

                                        {(item.content ?? '').split("\n").length > 2 && (
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
                {reportOpen !== null && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-999'>
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
                                    onClick={() => setReportOpen(null)}
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={reportSubmitting}
                                    className={`px-4 py-2 rounded-lg ${reportSubmitting ? 'bg-red-300 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                    onClick={submitReport}
                                >
                                    {reportSubmitting ? 'Submitting...' : 'Submit'}
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


                            {/* Comment */}
                            <div className="flex gap-3 mt-4">
                                {/* Avatar */}



                                {/* Content */}
                                <div className="flex-1">
                                    {comments && comments.length > 0 ? (
                                        comments.map((c) => (
                                            <div key={c._id} className="mb-4 flex gap-2">
                                                {/* Avatar */}
                                                <img
                                                    src={c.userId.profile ? `http://localhost:4000/upload/${c.userId.profile}` : "/default-avatar.png"}
                                                    alt={c.userId.username}
                                                    className="w-10 h-10 rounded-full"
                                                />

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-semibold">{c.userId.username}</h4>
                                                        <FaEllipsisH
                                                            onClick={() => setOpenOptionId(c._id)}
                                                            className="text-gray-400 cursor-pointer"
                                                        />
                                                    </div>
                                                    <p className="mt-2 text-gray-700">{c.text}</p>
                                                    {c.reply?.text && (
                                                        <div className="ml-6 mt-1 p-2 bg-gray-100 rounded">
                                                            <span className="font-semibold">Author Reply: </span>
                                                            {c.reply.text}
                                                        </div>
                                                    )}
                                                </div>
                                                {openOptionId === c._id && (
                                                    <div className="ml-40 bg-white border w-28 h-8 shadow rounded">

                                                        <button
                                                            onClick={() => handleDeleteComment(c._id)}
                                                            className="ml-2 text-red-600"
                                                        >
                                                            <b>Delete</b>
                                                        </button>





                                                    </div>
                                                )}

                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 mt-2">No comments yet.</p>
                                    )}

                                </div>

                            </div>

                            {/* New Comment Input */}
                            <div className="relative mt-6">
                                <input
                                    className='border w-100 mt-3 rounded-2xl'
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}

                                />

                                <div className="absolute ml-106 top-2.5 flex items-center   gap-2">

                                    <FaSmile className="text-gray-400 cursor-pointer " />
                                    <button

                                        disabled={!comment.trim()}
                                        onClick={handleComment}
                                        className={`px-3 py-1 rounded-md text-sm ${comment.trim()
                                            ? "bg-purple-600 text-white border"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed border"
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
                                <button onClick={() => setOpen(false)}>X</button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
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

                                {/* Show current question */}
                                {questionIndex < predefinedQuestions.length && (
                                    <div className="mt-2 font-semibold text-gray-700">
                                        {predefinedQuestions[questionIndex]}
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-3 border-t flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type your answer..."
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}
                                    className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                                />
                                <button
                                    onClick={handleSendAnswer}
                                    className="bg-black text-white px-4 py-2 rounded-full"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}


                </div>
                <ToastContainer position='top-center' />



            </div>
        </>
    )
}

export default Homepage
