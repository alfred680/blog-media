import axios from "axios";


export const commonApi=async(httpRequest,url,reqBody,reqHeader)=>{
    console.log(reqBody);

    const reqConfiq={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader

    }
    console.log(reqConfiq);

    return await  axios(reqConfiq).then((res)=>{
        return res
    }).catch((err)=>{
        return err
        console.log(err);
        
    }) 
    
    
}