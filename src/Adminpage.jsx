import { faDotCircle, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader';
import { allblogadminAPI, deleteadminblogAPI, fetchAllChatsAPI, reportgetAPI } from './server/Allapi';

function Adminpage() {
    const [allblogs, setallblog] = useState(true)
    const [request, setrequest] = useState(false)
    const [subscrition, setsubscrition] = useState(false)
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [openIndex, setOpenIndex] = useState(null);
    const [menuIndex, setMenuIndex] = useState(null);

    const [allBlogs, setAllBlogs] = useState([]);

    const [open, setopen] = useState(false)
    const [option, setoption] = useState(false)
    const [expanded, setExpanded] = useState({})
    const toggleReadMore = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index], // toggle only this blog
        }));
    };
    console.log(allBlogs);

    const [reports, setReports] = useState([]);
    console.log(reports);

    // delete blog
    const handleDelete = async (blogId) => {
        const token = sessionStorage.getItem("token");
        const reqHeader = { Authorization: `Bearer ${token}` };

        try {
            const res = await deleteadminblogAPI(reqHeader, blogId);

            if (res.status === 200) {
                alert("Blog deleted successfully");

                // Remove deleted blog from the reports state
                setReports((prev) => prev.filter((r) => r.blogId?._id !== blogId));
            } else {
                alert("Failed to delete blog");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Error deleting blog");
        }
    };

    // get blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };

            try {
                const res = await allblogadminAPI(reqHeader);
                setAllBlogs(res.data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };

        fetchBlogs();

    }, []);


    // get report
    useEffect(() => {
        const fetchReports = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) return;

            const reqHeader = {
                Authorization: `Bearer ${token}`
            };

            try {
                const res = await reportgetAPI(reqHeader);

                if (res.status === 200) {
                    setReports(res.data);
                }
            } catch (err) {
                console.log(err);

            }
        };

        fetchReports();
    }, []);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const reqHeader = { Authorization: `Bearer ${token}` };
                const res = await fetchAllChatsAPI(reqHeader);
                setChats(res.data);
            } catch (err) {
                console.log(err);
                alert(err.response?.data?.message || "Error fetching chats");
            }
        };

        getChats();
    }, []);
    return (
        <div>
            <AdminHeader />
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
                    <h1 onClick={() => { setallblog(true), setrequest(false), setsubscrition(false) }} className={allblogs ? 'cursor-pointer text-white rounded-4xl border p-2 px-4 bg-black' : "rounded-4xl border p-2 px-4"} >All Blogs</h1>
                    <h1 onClick={() => { setallblog(false), setrequest(true), setsubscrition(false) }} className={request ? 'cursor-pointer text-white rounded-4xl border p-2 px-4 bg-black' : 'rounded-4xl border p-2 px-4'} >Request</h1>
                    <h1 onClick={() => { setallblog(false), setrequest(false), setsubscrition(true) }} className={subscrition ? 'cursor-pointer text-white rounded-4xl border p-2 px-4 bg-black' : 'rounded-4xl border p-2 px-4'}  >Analyse</h1>



                </div>
                {allblogs && (
                    <div className="flex flex-wrap">
                        {allBlogs.map((blog, index) => (
                            <div
                                key={blog._id}
                                className="border rounded-4xl ml-10 mt-10 mb-10 bg-white relative"
                                style={{
                                    height: openIndex === index ? "auto" : "520px",
                                    width: "500px",
                                }}
                            >
                                {/* Menu dots */}
                                <div
                                    className="flex flex-col items-end mr-3 mt-2 cursor-pointer"
                                    onClick={() =>
                                        setMenuIndex(menuIndex === index ? null : index)
                                    }
                                >
                                    {[...Array(3)].map((_, i) => (
                                        <FontAwesomeIcon
                                            key={i}
                                            icon={faDotCircle}
                                            style={{ height: "7px" }}
                                        />
                                    ))}
                                </div>

                                {/* Dropdown menu */}
                                {menuIndex === index && (
                                    <div className="absolute top-10 right-4 bg-white border rounded-xl shadow-md z-10">
                                        <ul className="py-2">
                                            <li
                                                className="px-4 py-1 hover:bg-gray-100 cursor-pointer flex"
                                                onClick={() => handleDelete(blog._id)}
                                            >
                                                <FontAwesomeIcon className='mt-1' icon={faTrash} />
                                                <span className="ml-3 font-bold">Delete</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {/* Blog content */}
                                <div className="p-5 overflow-y-auto">
                                    <img
                                        className="rounded-2xl w-full"
                                        style={{ height: "200px" }}
                                        src={
                                            blog.uploadimg && blog.uploadimg.length > 0
                                                ? `http://localhost:4000/upload/${blog.uploadimg[0]}`
                                                : "https://via.placeholder.com/200"
                                        }
                                        alt="blog"
                                    />

                                    <h1 className="font-bold text-2xl mt-4 ml-10">
                                        {blog.title}
                                    </h1>

                                    <p className="text-justify px-10 text-sm mt-5">
                                        {blog.content?.slice(0, 150)}...
                                    </p>

                                    {openIndex === index && (
                                        <p className="text-justify px-10 text-sm mt-5">
                                            {blog.content}
                                        </p>
                                    )}

                                    <p
                                        onClick={() =>
                                            setOpenIndex(openIndex === index ? null : index)
                                        }
                                        className="text-blue-400 cursor-pointer text-right mr-10"
                                    >
                                        {openIndex === index ? "Show less" : "Read more"}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                )}


                <div className=''>
                    {/* {option && (
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
                        </div>)} */}

                    {request && <div className='flex flex-wrap'>
                        {reports.map((da, index) => (
                            <div
                                key={da._id}
                                className="border rounded-4xl ml-10 mt-10 mb-10 bg-white relative"
                                style={{
                                    height: openIndex === index ? "auto" : "520px",
                                    width: "500px",
                                }}
                            >
                                {/* Menu dots */}
                                <div className="flex flex-col items-end mr-3 mt-2">
                                    {[...Array(3)].map((_, i) => (
                                        <FontAwesomeIcon
                                            key={i}
                                            icon={faDotCircle}
                                            style={{ height: "7px", cursor: "pointer" }}
                                            onClick={() =>
                                                setMenuIndex(menuIndex === index ? null : index)
                                            }
                                        />
                                    ))}
                                </div>

                                {/* Dropdown menu */}
                                {menuIndex === index && (
                                    <div className="absolute top-10 right-4 bg-white border rounded-xl shadow-md z-10">
                                        <ul className="py-2">
                                            <li

                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                                <span onClick={() => handleDelete(da.blogId._id)} className="ml-3 font-bold">Delete</span>
                                            </li>


                                        </ul>
                                    </div>
                                )}

                                {/* Blog content */}
                                <div className="p-5 overflow-y-auto">
                                    <img
                                        className="rounded-2xl w-full"
                                        style={{ height: "200px" }}
                                        src={
                                            da.blogId?.uploadimg && da.blogId.uploadimg.length > 0
                                                ? `http://localhost:4000/upload/${da.blogId.uploadimg[0]}`
                                                : "https://via.placeholder.com/200" // fallback image
                                        }
                                        alt="blog"
                                    />


                                    <h1 className="font-bold text-2xl mt-4 ml-10">
                                        {da.blogId?.title}
                                    </h1>

                                    <p className="text-justify px-10 text-sm mt-5">
                                        {da.blogId?.content?.slice(0, 150)}...
                                    </p>

                                    {openIndex === index && (
                                        <p className="text-justify px-10 text-sm mt-5">
                                            {da.blogId?.content}
                                        </p>
                                    )}

                                    <p
                                        onClick={() =>
                                            setOpenIndex(openIndex === index ? null : index)
                                        }
                                        className="text-blue-400 cursor-pointer text-right mr-10"
                                    >
                                        {openIndex === index ? "Show less" : "Read more"}
                                    </p>

                                    {/* Report reason */}
                                    <div className="mt-4 px-10 text-red-500 text-sm">
                                        <b>Reason:</b> {da.reason}
                                    </div>

                                    <div className="px-10 text-gray-500 text-xs">
                                        Reported by: {da.reportedBy}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>}


                </div>
                {subscrition && (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">User Support Chats</h2>


                        <p className="text-gray-500">No chats found</p>


                        <div

                            className="mb-5 p-4 border rounded-xl bg-gray-50 shadow-sm"
                        >
                            <p className="font-semibold">

                            </p>

                            <div className="mt-3 space-y-2">

                                <div className="p-2 bg-white rounded-lg border">
                                    <p className="text-sm">
                                        <span className="font-semibold">Q:</span>
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">A:</span>
                                    </p>
                                </div>

                            </div>
                        </div>


                    </div>
                )}

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