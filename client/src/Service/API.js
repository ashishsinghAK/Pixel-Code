const BASE_URL = import.meta.env.VITE_BASE_URL;
// console.log(BASE_URL);
export const categories = {
    CATEGORIES_DETAIL:BASE_URL+"/course/getCategoryDetail"
}

export const resetPassword = {
    TOKEN_API : BASE_URL+"/profile/resetPasswordToken",
    RESET_API: BASE_URL+"/profile/resetPassword",
}

export const authorisation = {
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    SEND_OTP:BASE_URL+"/auth/sendotp"
}

export const contactUsData = {
    CONTACT_US_API:BASE_URL+""
}

export const dashboard = {
    SETTING_API:BASE_URL+"/profile/updateProfile",
    DELETE_API:BASE_URL+"/profile/deleteProfile",
}

export const CourseDetail = {
    GET_ENROLLED_COURSES:BASE_URL+"/course/getEnrolledCourse",
    COURSE_CATEGORY:BASE_URL+"/course/showAllCategory",
    ALL_COURSE:BASE_URL+"/course/showAllCourse",
    COURSE_DETAIL:BASE_URL+"/course/getCourseDetail",
    CREATE_COURSE:BASE_URL+"/course/createCourse",
    UPDATE_SECTION:BASE_URL+"/course/updateSection",
    CREATE_SECTION:BASE_URL+"/course/addSection",
    DELETE_SECTION:BASE_URL+"/course/deleteSection",
    DELETE_SUBSECTION:BASE_URL+"/course/deleteSubSection",
    CREATE_SUBSECTION:BASE_URL+"/course/addSubSection",
    INSTRUCTOR_COURSE:BASE_URL+"/course/InstructorCourses",
    ENROLL_COURSE:BASE_URL+"/course/enrollCourse"
}