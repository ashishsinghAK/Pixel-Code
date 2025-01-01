import { toast } from "react-hot-toast"
import { ApiConnector } from "./ApiConnector"
import { CourseDetail } from "./API"

export const getAllCourse = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await ApiConnector();
        if (!response.data.success) {
            throw new Error("Could not fetch course categories")
        }
        result = response?.data?.data

    } catch (error) {
        console.log("Get all course api error", error.message);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseDetail = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await ApiConnector("POST", CourseDetail.COURSE_DETAIL, { courseId }, {
            Authorization: `Bearer ${token}`
        });
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("Course detail api error", error);
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

//fetching the available course category
export const getCourseCategory = async (token) => {
    let result = []
    try {
        const response = await ApiConnector("GET", CourseDetail.COURSE_CATEGORY, null, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could not fetch course category")
        }
        result = response?.data?.showAllcategory
    } catch (error) {
        console.log(error);
        // toast.error(error.message)
    }
    return result
}

export const createCourse = async (data, token) => {
    let result = null
    try {
        const response = await ApiConnector("POST", CourseDetail.CREATE_COURSE, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could not add course detail")
        }
        toast.success("Course added successfully")
        result = response?.data?.newCourse
        console.log('logging result', result);


    } catch (error) {
        console.log('create course api error', error.message);
        toast.error(error.message)

    }
    return result;
}

export const updateSection = async (data, token) => {
    let result = null;
    try {
        const response = await ApiConnector("POST", CourseDetail.UPDATE_SECTION, data, {
            Authorization: `Bearer ${token}`
        })
        console.log('Updated section response', response);
        if (!response?.data?.success) {
            throw new Error('Could not update section');
        }
        toast.success('Section updated');
        result = response?.data?.data;
    } catch (error) {
        console.log('Update section api error', error);
        toast.error(error.message);
    }
    return result;
}

export const createSection = async (data, token) => {
    let result = null;
    try {
        const response = await ApiConnector("POST", CourseDetail.CREATE_SECTION, data, {
            Authorization: `Bearer ${token}`
        })
        console.log('section created', response.data);
        if (!response?.data?.success) {
            throw new Error('Could not create section')
        }
        toast.success('Section created')
        result = response?.data?.updatedCourse;
        // console.log('result for create section',result);

    } catch (error) {
        console.log('create section API error', error);
        toast.error(error.message)
    }
    return result;
}

export const createSubSection = async (data, token) => {
    let result = null;
    try {
        const response = await ApiConnector("POST", CourseDetail.CREATE_SUBSECTION, data, {
            Authorization: `Bearer ${token}`
        })
        console.log('create subsection response', response)
        if (!response?.data?.success) {
            throw new Error('Could not create Sub-Section');
        }
        toast.success('Sub-Section Created')
        result = response?.data?.updatedCourse;
        console.log('result of create sub section', result)
    } catch (error) {
        console.log('Create subsection API Error')
        toast.error(error.message)
    }
    return result;
}

export const deleteSection = async (data, token) => {
    let result = null;
    try {
        const response = await ApiConnector("DELETE", CourseDetail.DELETE_SECTION, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error('Error while deleting section')
        }

        toast.success('Section Deleted')
        result = response?.data?.updatedCourse

    } catch (error) {
        console.log('Delete section API error', error);
        toast.error('deletion failed');
    }
    return result;
}

export const deleteSubSection = async (data, token) => {
    let result = null;
    try {
        const response = await ApiConnector("DELETE", CourseDetail.DELETE_SUBSECTION, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Error while deleting subsection");
        }
        toast.success("Deleted Successfully")
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log('Delete SubSection API error', error);
        toast.error('Deletion failed');
    }
    return result;
}

export const editCourseDetail = async (data, token) => {
    let result = null;
    //1:01:30 time
    try {
        const response = await ApiConnector("POST", data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("Edit course detail api response", response);
        if (!response?.data?.success) {
            throw new Error("Could not update course Detail");
        }
        toast.success("Course Detail Updated Successfully")
        result = response?.data?.data

    } catch (error) {
        console.log("Edit course API Error", error);
        toast.error(error.message);
    }
    return result;
}

export const InstructorCourseDetail = async (InstructorId, token) => {
    let result = null;
    try {
        const response = await ApiConnector("GET", CourseDetail.INSTRUCTOR_COURSE, InstructorId, {
            Authorization: `Bearer ${token}`
        })
       
        if (!response?.data?.success) {
            throw new Error("Error while fetching your Courses");
        }
        result = response?.data?.InstructorCourses;
        
    } catch (error) {
        console.log("InstructorCourse API Error", error);
        toast.error("Not able to fetch Course")
    }
    return result;
}

export const EnrollCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await ApiConnector("POST", CourseDetail.ENROLL_COURSE, { courseId }, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Error while enrolling in the course")
        }
        toast.success("Course enrolled successfully")

    } catch (error) {
        console.log("Enroll course API error", error);
        // Check for already enrolled case
        if (error.response?.status === 409) {
            toast.success("You are already enrolled in this course");
        } else {
            toast.error(error.message);
        }
    }
    toast.dismiss(toastId)
}