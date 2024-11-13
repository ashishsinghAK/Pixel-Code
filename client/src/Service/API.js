const BASE_URL = import.meta.env.VITE_BASE_URL;
// console.log(BASE_URL);
export const categories = {
    CATEGORIES_API:BASE_URL+"/course/showAllCategory"
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
    GET_ENROLLED_COURSES:BASE_URL+"/course/getEnrolledCourse"
}