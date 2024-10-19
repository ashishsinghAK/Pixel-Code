import { useDispatch } from "react-redux"
import { setUser } from "../Reducer/slice/profileSlice"
import { setToken } from "../Reducer/slice/authSlice"
import { setLoading } from "../Reducer/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { ApiConnector } from "./ApiConnector";
import { resetPassword, authorisation } from "./API";
import { toast } from "react-hot-toast"

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const res = await ApiConnector("POST", authorisation.LOGIN_API, { email, password })

            if (res.data.success) {
                const { token,user } = res.data
                dispatch(setToken(token))
                dispatch(setUser(user))
                
                localStorage.setItem('token', token)
                localStorage.setItem('user',JSON.stringify(user))
                toast.success("Login Successfull")
                navigate("/")
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
        toast.success("Logged out")
        navigate("/")
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await ApiConnector("POST", resetPassword.TOKEN_API, { email });
            console.log("res is", response);
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
            console.log('password reset response', response);
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