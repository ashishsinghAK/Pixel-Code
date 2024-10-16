import { useDispatch } from "react-redux"
import { setUser } from "../Reducer/slice/profileSlice"
import { setToken } from "../Reducer/slice/authSlice"
import { setLoading } from "../Reducer/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { ApiConnector } from "./ApiConnector";
import { resetPassword } from "./API";
import {toast} from "react-hot-toast"



export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Log out successfully")
        navigate("/")
    }
}

export function getPasswordResetToken(email,setEmailSent){
   return async(dispatch) => {
     dispatch(setLoading(true))
    try{
        const response = await ApiConnector("POST",resetPassword.TOKEN_API,{email});
        console.log("res is",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Email sent successfull")
        setEmailSent(true);
        
    }
     catch(err){
        console.log("Reset password token error");
        console.log(err.message);
        toast.error("error occured")    
     }
     dispatch(setLoading(false))
   }
   
}

export function PasswordReset(password, confirmPassword, token){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await ApiConnector("POST",resetPassword.RESET_API,{
                password,confirmPassword,token
            })
            console.log('password reset response',response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password Reset Successfull")
            
        }catch(error){
            console.log("Reset password failed");
           console.log(error.message);
           toast.error("error occured")   
        }
        dispatch(setLoading(false))
    }
    
}