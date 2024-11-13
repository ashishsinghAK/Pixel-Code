import { toast } from "react-hot-toast"
import { ApiConnector } from "./ApiConnector"
import { CourseDetail } from "./API"

export async function EnrolledCourse(token){
    const toastId = toast.loading('Loading...')
    let result = []
    try{
        const response = await ApiConnector("GET",CourseDetail.GET_ENROLLED_COURSES,null,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data

    }catch(error){
        toast.error('Could not get courses')
    }
    toast.dismiss(toastId)
    return result;  
}