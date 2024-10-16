const BASE_URL = import.meta.env.VITE_BASE_URL;
// console.log(BASE_URL);
export const categories = {
    CATEGORIES_API:BASE_URL+"/course/showAllCategory"
}

export const resetPassword = {
    TOKEN_API : BASE_URL+"/profile/resetPasswordToken",
    RESET_API: BASE_URL+"/profile/resetPassword",
}