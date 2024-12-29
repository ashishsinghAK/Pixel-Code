import { toast } from "react-hot-toast"
import { ApiConnector } from "./ApiConnector"
import { CourseDetail } from "./API"

export async function EnrolledCourse(token) {
    const toastId = toast.loading('Loading...')
    let result = []
    try {
        const response = await ApiConnector("GET", CourseDetail.GET_ENROLLED_COURSES, null, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data

    } catch (error) {
        toast.error('Could not get courses')
    }
    toast.dismiss(toastId)
    return result;
}

// export const markLectureAsComplete = async (data, token) => {
//     let result = null;
//     //console.log("data for mark lecture complete",data);
//     const toastId = toast.loading("Loading...")
//     try {
//         const response = await ApiConnector("POST", CourseDetail.COURSE_PROGRESS, data, {
//             Authorization: `Bearer ${token}`
//         })
//         console.log('Mark lecture complete API response', response);
//         if (!response.data.success) {
//             throw new Error(response.data.error);
//         }
       
//         result = response.data.data
//         console.log("result length",result);
//     } catch (error) {
//         console.log("Mark Lecture API error", error);
//         toast.error(error.message);
//         result = false;
//     }
//     toast.dismiss(toastId);
//     return result;
// }