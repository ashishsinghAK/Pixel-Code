import axios from "axios"

export const axiosInstance = axios.create({});

export const ApiConnector = (method,url,bodyData,header,params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData : null,
        headers:header ? header : null,
        params: params ? params : null
    })
}