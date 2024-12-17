import { useDispatch } from "react-redux"
import { setDetail, setUser } from "../Reducer/slice/profileSlice"
import { setToken } from "../Reducer/slice/authSlice"
import { setLoading } from "../Reducer/slice/authSlice";
import { ApiConnector } from "./ApiConnector";
import { resetPassword, authorisation, dashboard } from "./API";
import { toast } from "react-hot-toast"

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const res = await ApiConnector("POST", authorisation.LOGIN_API, { email, password })

            if (res.data.success) {
                const { token, user } = res.data
                dispatch(setToken(token))
                dispatch(setUser(user))

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                toast.success("Login Successfull")
                navigate("/dashboard")
            }


        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false))
    }
}


export function signup(
    firstName, lastName, email, password, confirmPassword, accountType,
    otp, navigate
) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log(otp);
            
            const response = await ApiConnector("POST", authorisation.SIGNUP_API, {
                firstName, lastName, email, password, confirmPassword, accountType, otp
            })
            

            if (!response.data.success) {
                throw new Error("Signup data missing")
            }
            toast.success("Signup Successfull")
            navigate("/login")

        } catch (error) {
            console.log("Signup failed ");
            console.log(error.message);
            toast.error("error occured")
        }
        dispatch(setLoading(false))

    }
}

export function SendOtp(email, navigate) {

    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await ApiConnector("POST", authorisation.SEND_OTP, {
                email,
                checkUserPresent: true
            })
            console.log('otp response', response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP sent successfully")
            navigate("/verify-email")

        } catch (error) {
            toast.error("OTP Sending Failed")
            console.log(error.message);

        }
        dispatch(setLoading(false))
    }
}


export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("cart")
        toast.success("Logged out")
        navigate("/")
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await ApiConnector("POST", resetPassword.TOKEN_API, { email });
            // console.log("res is", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Email sent successfull")
            setEmailSent(true);

        }
        catch (err) {
            console.log("Reset password token error");
            console.log(err.message);
            toast.error("error occured")
        }
        dispatch(setLoading(false))
    }

}

export function PasswordReset(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await ApiConnector("POST", resetPassword.RESET_API, {
                password, confirmPassword, token
            })
            // console.log('password reset response', response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Reset Successfull")

        } catch (error) {
            console.log("Reset password failed");
            console.log(error.message);
            toast.error("error occured")
        }
        dispatch(setLoading(false))
    }

}

export function UpdateDetail(dateOfBirth, about, contactNumber, gender,token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log("Making API request with data:", { dateOfBirth, about, contactNumber, gender });

            const response = await ApiConnector("PUT", dashboard.SETTING_API, {
                dateOfBirth, about, contactNumber, gender,token
            });

           
            console.log("API response received:", response.data);

            if (!response || !response.data) {
                throw new Error("Invalid response format from API.");
            }

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const {profileDetail} = response.data;      
            dispatch(setDetail(profileDetail))
            localStorage.setItem('detail',JSON.stringify(profileDetail))
            toast.success("Profile updation successful");
            navigate("/dashboard");

        } catch (error) {
            console.log("Profile update failed:", error.message);
            toast.error("Error occurred: " + error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
}



export function DeleteProfile(token,navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await ApiConnector("DELETE", dashboard.DELETE_API,{token})
            if (!response.data.success) {
                throw new Error("Profile deleteion failed");
            }

                dispatch(setToken(null))
                dispatch(setUser(null))
                dispatch(setDetail(null))
                localStorage.removeItem('token', token)
                localStorage.removeItem('user')
                toast.success("Profile deletion Successfull");
                console.log("Navigating to home");
                navigate("/")

        } catch (error) {
            console.log("Profile deletion failed");
            console.log(error.message);
            toast.error("error occured")
        }
    }
}