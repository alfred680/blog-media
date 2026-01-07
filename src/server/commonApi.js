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

    try {
        const res = await axios(reqConfiq);
        return res;
    } catch (err) {
        console.log('API error', err.response ? err.response.data : err.message);
        throw err;
    }

}