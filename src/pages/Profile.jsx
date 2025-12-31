import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header2 from "./Header2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faDotCircle, faPenToSquare, faPlus, faTrash, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { addblogAPI, blogbyuser, deleteblogAPI, edituserprofileAPI, updateblogAPI } from "../server/Allapi";
import { userProfileContext } from "../context/ContextShare";
import { FaEllipsisH, FaSmile } from "react-icons/fa";

function Profile() {
  const [editprofile, seteditprofile] = useState(false);
  const [post, setpost] = useState(true)
  const [open, setopen] = useState(false)
  const [option, setoption] = useState(false)
  const [uplod, setuplod] = useState(false)
  const [addpost, setaddpost] = useState(false)
  const [preview, setPreview] = useState('')
  const [previewList, setPreviewList] = useState([])
  const [token, setToken] = useState("");
  const [userBlogs, setUserBlogs] = useState([])
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [comment, setComment] = useState("");
      const [reply, setReply] = useState("");
   const [commentbox, setCommentbox] = useState(false)
      const [replayopen, setReplyopen] = useState(false)
  const [editData, setEditData] = useState({
    _id: "",
    title: "",
    content: "",
  });
  console.log(editData);

  const toggleReadMores = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openEditModal = (detail) => {
    setEditData({
      _id: detail._id,
      title: detail.title,
      content: detail.content
    });

    setIsEditOpen(true);
  };


  const { userProfile } = useContext(userProfileContext);
  console.log(userProfile);


  const [expanded, setExpanded] = useState({}); // track expanded state per blog


  const toggleReadMore = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only this blog
    }));
  };
  const [prof, setprof] = useState({

    username: "",
    profile: "",
    bio: null

  })
  console.log(prof);



  const [blogDetails, setblogdetails] = useState({
    title: "",
    content: "",
    reportcontent: "",
    premiem: "",   // optional string
    payment: "",   // optional string
    uploadimg: null  // single file
  });

  console.log(blogDetails);




  // image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file);

    setblogdetails(prev => ({
      ...prev,
      uploadimg: file
    }));

    if (previewList.length === 0) {
      const url = URL.createObjectURL(file);
      console.log(url);

      setPreview(url);
      setPreviewList([url]);
    } else {
      toast.error('Only 1 image allowed.');
    }
  };
  const handleUploads = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file); // just to check the selected file

    setprof((prev) => ({
      ...prev,
      profile: file // store the File object in state
    }));

    // Optional: create preview URL for immediate display
    setPreview(URL.createObjectURL(file));
  };

  // add blog
  const handleSubmit = async () => {
    const { title, content, uploadimg, reportcontent, premiem, payment } = blogDetails;

    if (!title || !content || !uploadimg) {
      toast.warning("Please fill the required fields: Title, Content, Image");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to add a blog");
      return;
    }

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const reqBody = new FormData();

      for (let key in blogDetails) {
        const value = blogDetails[key];
        if (value !== "" && value !== null) {
          // If it's a File (image) include the filename
          if (value instanceof File) {
            reqBody.append(key, value, value.name);
          } else {
            reqBody.append(key, value);
          }
        }
      }

      const result = await addblogAPI(reqBody, reqHeader);
      console.log("addblogAPI result:", result);

      if (result && result.status >= 200 && result.status < 300) {
        toast.success("Blog added");

        // Reset all fields
        setblogdetails({
          title: "",
          content: "",
          uploadimg: null,
          reportcontent: "",
          premiem: "",
          payment: ""
        });
        setPreview("");
        setPreviewList([]);
        setaddpost(false);

      } else {
        const msg = result?.data?.message || "Something went wrong";
        toast.error(msg);
      }

    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  // user blog
  const userBlog = async () => {
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    }
    const result = await blogbyuser(reqHeader)
    console.log(result);

    if (result.status == 200) {
      setUserBlogs(result.data)

    }

  }
  // edit profile
  const editprofileuser = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };

      const formData = new FormData();
      formData.append("username", prof.username);
      formData.append("bio", prof.bio);

      // append only if user selected new image
      if (prof.profile) {
        formData.append("profile", prof.profile);
      }

      const result = await edituserprofileAPI(formData, reqHeader);

      if (result.status === 200) {
        alert("Profile updated successfully ✅");
        console.log(result.data);

        setprof(result.data)
      }
    } catch (err) {
      console.error(err);
      alert("Profile update failed ❌");
    }
  }

  // delete blog
  const deleteblog = async (id) => {

    const result = await deleteblogAPI(id)
    if (result.status == 200) {
      toast.success("blog deleted")
      userBlog()

    } else {
      toast.error("something went wrong")
    }
  }
  // update blog
  const updateBlog = async (id) => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const reqBody = {
        title: editData.title,
        content: editData.content
      };

      await updateblogAPI(editData._id, reqHeader, reqBody);

      toast.success("Blog updated");
      userBlog();
      setIsEditOpen(false);

    } catch (err) {
      console.log(err);

      toast.error("Update failed");
    }
  };



  useEffect(() => {

    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      setToken(token)
    }
    const Users = JSON.parse(sessionStorage.getItem('exstinguser'))
    setprof({ username: Users.username, profile: Users.profile, bio: Users.bio })

  }, [userProfile])

  useEffect(() => {
    if (token) {
      userBlog()
    }
  }, [token])









  return (
    <>
      <div className=" top-0 w-screen left-0">

      </div>


      <div className="flex">

        <div className="fixed top-0  left-0 h-screen w-[250px]">
          <Sidebar />
        </div>


        <div className="ml-60 w-full ">


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
                src={preview ||
                  (prof.profile
                    ? `http://localhost:4000/upload/${prof.profile}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png")}

                alt="profile"
              />

              <div className="mt-20">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{prof.username}</h1>
                  <span>
                    <img
                      className="h-6"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                      alt="verified"
                    />
                  </span>
                </div>


                <p className="text-gray-600 mt-2 w-[400px]">
                  {prof.bio}
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
            <h1 onClick={() => { setpost(true), setuplod(false) }} style={{ fontFamily: "Roboto" }} className={post ? '  px-70 py-1 font-bold cursor-pointer bg-gray-200 rounded-md transition-all duration-200 shadow-md' : 'ms-80 font-bold   '}>Posts</h1>
            <h1 style={{ fontFamily: "Roboto" }} onClick={() => { setpost(false), setuplod(true) }} className={uplod ? ' ms-80 px-70 py-1 font-bold cursor-pointer bg-gray-200 rounded-md transition-all duration-200 shadow-md' : 'ms-80 font-bold   '}>Uplod</h1>

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
                      onChange={(e) => handleUploads(e)}

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
                      value={prof.username}
                      onChange={(e) => setprof({ ...prof, username: e.target.value })}
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">Bio</label>
                    <textarea
                      value={prof.bio}
                      onChange={(e) => setprof({ ...prof, bio: e.target.value })}
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 h-[140px] focus:ring-2 focus:ring-blue-300"
                      placeholder="  bio"
                    ></textarea>
                  </div>

                  <button onClick={editprofileuser} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Submit
                  </button>
                </div>

              </div>
            </div>
          )}

          {post && (
            <div className="flex flex-wrap">
              {userBlogs.map((detail, index) => (
                <div
                  key={index}
                  className="relative border rounded-4xl ml-10 mt-10 mb-10 bg-white"
                  style={{
                    width: "500px",
                    height: expanded[index] ? "auto" : "520px",
                  }}
                >
                  {/* Menu Dots */}
                  <div className="flex flex-col items-end mr-4 mt-3">
                    {[...Array(3)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faDotCircle}
                        style={{ height: "7px", cursor: "pointer" }}
                        onClick={() =>
                          setOpenMenuIndex(
                            openMenuIndex === index ? null : index
                          )
                        }
                      />
                    ))}
                  </div>

                  {/* Blog Content */}
                  <div className="p-5 overflow-hidden overflow-y-auto">
                    <img
                      className="rounded-2xl w-full object-cover"
                      style={{ height: "200px" }}
                      src={
                        detail.uploadimg?.length
                          ? `http://localhost:4000/upload/${detail.uploadimg[0]}`
                          : "https://adventure-pulse.com/wp-content/uploads/2025/02/Yunam-Peak-Adventure-Pulse-2.jpg"
                      }
                      alt="blog"
                    />

                    <h1 className="font-bold text-2xl mt-4 ml-10">
                      {detail.title}
                    </h1>

                    <p className="text-justify px-10 text-sm mt-5">
                      {detail.content.split("\n")[0]}
                    </p>

                    {expanded[index] && (
                      <p className="text-justify px-10 text-sm mt-5">
                        {detail.content.split("\n").slice(1).join("\n")}
                      </p>
                    )}

                    <p
                      onClick={() => toggleReadMore(index)}
                      className="text-blue-400 cursor-pointer text-right mt-3 mr-10"
                    >
                      {expanded[index] ? "Show less" : "Read more"}
                    </p>
                  </div>

                  {/* Delete / Edit Menu */}
                  {openMenuIndex === index && (
                    <div className="absolute top-12 right-4 w-40 bg-white border rounded-xl shadow-lg z-10">
                      <ul className="py-2">
                        <li

                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span onClick={() => deleteblog(detail._id)} className="ml-3 font-bold">Delete</span>
                        </li>

                        <hr />

                        <li
                          onClick={() => openEditModal(detail)}

                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                          <span className="ml-3 font-bold">Edit</span>
                        </li>
                        <hr />
                        <li
                          onClick={() => setCommentbox(detail)}

                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex"
                        >
                          <FontAwesomeIcon icon={faComment} />
                          <span className="ml-3 font-bold">Comments</span>
                        </li>
                      </ul>
                      {isEditOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white rounded-xl w-[500px] p-6 relative">
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="absolute top-4 right-4 cursor-pointer"
                              onClick={() => setIsEditOpen(false)}
                            />

                            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

                            <input
                              type="text"
                              name="title"
                              value={editData.title}
                              onChange={(e) => setEditData({ ...editData, title: e.target.value })}



                              className="w-full border rounded-lg px-3 py-2 mb-4"
                              placeholder="Title"
                            />

                            <textarea
                              name="content"
                              value={editData.content}
                              onChange={(e) => setEditData({ ...editData, content: e.target.value })}


                              rows={6}
                              className="w-full border rounded-lg px-3 py-2"
                              placeholder="Content"
                            />

                            <div className="flex justify-end mt-4 gap-3">
                              <button
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 border rounded-lg"
                              >
                                Cancel
                              </button>

                              <button
                                onClick={updateBlog}

                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EDIT MODAL */}





          {uplod && <div>

            <div className="ms-10 ">
              <img onClick={() => setaddpost(true)} className="mt-10 ms-120" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4y4mHujo5wQCxYw-kEua3Aw9Dli5CRsBeGmRR4ca3t0TrLoH4i--6nT-e5D5vaToflHc&usqp=CAU" alt="no image" />
            </div>

          </div>}
          {addpost && (
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
                      value={blogDetails.title}
                      onChange={(e) => setblogdetails({ ...blogDetails, title: e.target.value })}
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                      type="text"
                      placeholder=" title"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">Content</label>
                    <textarea
                      value={blogDetails.content}
                      onChange={(e) => setblogdetails({ ...blogDetails, content: e.target.value })}
                      className="border mt-1 p-2 w-full rounded-lg bg-gray-50 h-[140px] focus:ring-2 focus:ring-blue-300"
                      placeholder="  write your blog"
                    ></textarea>
                  </div>
                  <div className="text-gray-400 mb-4 text-center">
                    <label>
                      <FontAwesomeIcon icon={faUpload} className="text-3xl mb-2" />
                      <input onChange={(e) => handleUpload(e)} className="ml-6" type="file" />

                    </label>
                  </div>

                  <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 mt-2 rounded-lg hover:bg-blue-700">
                    Submit
                  </button>
                </div>

              </div>
            </div>
          )}
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



        </div>
        <ToastContainer position='top-center' />
      </div >
    </>
  );
}

export default Profile;

