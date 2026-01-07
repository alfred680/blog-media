import { commonApi } from "./commonApi";
import { serverURL } from "./ServerUrl";


// register
export const regesterAPI = async (reqBody) => {
    return await commonApi("post", `${serverURL}/register`, reqBody)
}
// login
export const loginAPI = async (reqBody) => {
    return await commonApi("post", `${serverURL}/login`, reqBody)
}
// google login
export const googleloginAPI = async (reqBody) => {
    return await commonApi("post", `${serverURL}/google-login`, reqBody)
}

// ADD BLOG
export const addblogAPI = async (reqBody, reqHeader) => {
    return await commonApi("post", `${serverURL}/add-blog`, reqBody, reqHeader)
}
// all blog
export const allblogAPI = async (searchKey, reqHeader) => {
    return await commonApi("GET", `${serverURL}/all-blogs?search=${searchKey}`, '', reqHeader)

}
// user blog
export const blogbyuser = async (reqHeader) => {
    return await commonApi("GET", `${serverURL}/user-book`, '', reqHeader)
}
// edit user profile
export const edituserprofileAPI = async (reqBody, reqHeader) => {
    return await commonApi("put", `${serverURL}/user-profile`, reqBody, reqHeader)
}
// delete blog
export const deleteblogAPI = async (id) => {
    return await commonApi("delete", `${serverURL}/delete-blog/${id}`)

}
// ubdate the blog
export const updateblogAPI = async (id, reqHeader, reqBody) => {
    return await commonApi("put", `${serverURL}/edit-blog/${id}`, reqBody, reqHeader)
}
// buy premiem
export const buypremiemAPI = async (reqHeader) => {
    return await commonApi("post", `${serverURL}/buy-premium`, {}, reqHeader)
}


// active premiem page
export const activepremiemAPI = async (reqHeader) => {
    return await commonApi("post", `${serverURL}/active-premiem`, {}, reqHeader)
}
// report blog
export const reportblogAPI = async (reqHeader, blogId, reqBody) => {
    return await commonApi("post", `${serverURL}/report/${blogId}`, reqBody, reqHeader);
};


// get report blog
export const reportgetAPI = async (reqHeader) => {
    return await commonApi("get", `${serverURL}/reportblog`, "", reqHeader)
}
// delete reported
export const deleteadminblogAPI = async (reqHeader, blogId) => {
    return await commonApi("delete", `${serverURL}/admindelete/${blogId}`, "", reqHeader)
}


// alladminblog
export const allblogadminAPI = async (reqHeader) => {
    return await commonApi("get", `${serverURL}/admin-allblog`, "", reqHeader)

}

export const followUserAPI = async (userId, reqHeader) => {
    return await commonApi("put", `${serverURL}/follow/${userId}`, {}, reqHeader)
}
export const sendMessageAPI = async (messageBody, reqHeader) => {
  // messageBody should contain { receiverId, message, optional blogId }
  return await commonApi("post", `${serverURL}/message`, messageBody, reqHeader);
};


export const receiveringallmessagesAPI = async (receiverId, reqHeader) => {
    return await commonApi("get", `${serverURL}/messages/${receiverId}`, {}, reqHeader);
};



export const getReceiverAPI = async (blogId, reqHeader) => {
    return await commonApi("get", `${serverURL}/blogs/${blogId}/receiver`, {}, reqHeader);
};

export const searchUsersAPI = async (q, reqHeader) => {
  return await commonApi("get", `${serverURL}/users/search?q=${encodeURIComponent(q)}`, {}, reqHeader);
};

// Conversations
export const getConversationsAPI = async (reqHeader) => {
  return await commonApi("get", `${serverURL}/conversations`, {}, reqHeader);
};

export const getConversationMessagesAPI = async (conversationId, reqHeader) => {
  return await commonApi("get", `${serverURL}/conversations/${conversationId}/messages`, {}, reqHeader);
};

export const createConversationAPI = async (blogId, reqHeader) => {
  return await commonApi("post", `${serverURL}/conversations`, { blogId }, reqHeader);
};

export const deleteConversationAPI = async (conversationId, reqHeader) => {
  return await commonApi("delete", `${serverURL}/conversations/${conversationId}`, {}, reqHeader);
};

export const deleteMessageAPI = async (messageId, reqHeader) => {
  return await commonApi("delete", `${serverURL}/messages/${messageId}`, {}, reqHeader);
};


// add comment
export const addCommentAPI = async (reqBody, reqHeader) => {
  return await commonApi("post", `${serverURL}/add-comment`, reqBody, reqHeader)
}

// get comment
export const getCommentsAPI = async (blogId) => {
  return await commonApi("get", `${serverURL}/get-comments/${blogId}`, "", {})
}

// reply comments by author
export const replyCommentAPI = async (commentId, reqBody, reqHeader) => {
  return await commonApi("put", `${serverURL}/reply-comment/${commentId}`, reqBody, reqHeader)
}

// delete comment
export const deleteCommentAPI = async (commentId, reqHeader) => {
  return await commonApi("delete",`${serverURL}/comment/${commentId}`,{},reqHeader)
}
// delete comment by author
export const deletecommentauthorAPI = async(commentId,reqHeader)=>{
  return await commonApi("delete",`${serverURL}/comments/${commentId}`,{},reqHeader)

}

// chatbot
export const sendingChatbotAPI = async (questionIndex, answer, reqHeader) => {
  const reqBody = { questionIndex, answer };

  return await commonApi("post",`${serverURL}/chat/answer`,reqBody,reqHeader )
}



export const fetchAllChatsAPI = async (reqHeader) => {
  return await commonApi("get", `${serverURL}/chat/all`, {}, reqHeader);
}