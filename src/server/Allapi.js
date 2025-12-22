import { commonApi } from "./commonApi";
import { serverURL } from "./ServerUrl";


// register
export const regesterAPI=async(reqBody)=>{
    return await commonApi("post",`${serverURL}/register`,reqBody)
}
// login
export const loginAPI=async(reqBody)=>{
    return await commonApi("post",`${serverURL}/login`,reqBody)
}
// google login
export const googleloginAPI=async(reqBody)=>{
    return await commonApi("post",`${serverURL}/google-login`,reqBody)
}

// ADD BLOG
export const addblogAPI=async(reqBody,reqHeader)=>{
    return await commonApi("post",`${serverURL}/add-blog`,reqBody,reqHeader)
}
// all blog
export const allblogAPI=async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${serverURL}/all-blogs?search=${searchKey}`,'',reqHeader)

}
// user blog
export const blogbyuser=async(reqHeader)=>{
    return await commonApi("GET",`${serverURL}/user-book`,'',reqHeader)
}
// edit user profile
export const edituserprofileAPI=async(reqBody,reqHeader)=>{
    return await commonApi("put",`${serverURL}/user-profile`,reqBody,reqHeader)
}
// delete blog
export const deleteblogAPI=async(id)=>{
    return await commonApi("delete",`${serverURL}/delete-blog/${id}`)

}
// ubdate the blog
export const updateblogAPI=async(id,reqHeader,reqBody)=>{
    return await commonApi("put",`${serverURL}/edit-blog/${id}`,reqBody,reqHeader)
}
// buy premiem
export const buypremiemAPI=async(reqHeader)=>{
    return await commonApi("post",`${serverURL}/buy-premium`,{}, reqHeader)
}



export const activepremiemAPI=async(reqHeader)=>{
    return await commonApi("post",`${serverURL}/active-premiem`,{},reqHeader)
}