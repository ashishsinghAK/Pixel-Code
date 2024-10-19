const User = require('../model/User');
const OTP = require('../model/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie-parser');
const Profile = require('../model/Profile');
const MailSender = require('../Util/MailSender');

//sendOTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch emailfrom request body.
        const { email } = req.body;
        //check if user already exist.
        const checkUserPresent = await User.findOne({ email });
        // if user already exist then send a response.
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already exist"
            })
        }
        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("OTP Generated:", otp);

        //check the otp is unique or not.
        var result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({ otp: opt });
        }

        //create a object of the otp.
        const otpPayload = { email, otp };
        //create an entry for otp.
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//signUP

exports.Signup = async (req, res) => {

    try {
        //data fetch from req body
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;
       
        //validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password are not same, try again",
            })
        };

        // check user exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Registered"
            })
        };

        //find most recent otp
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);
        //validate otp
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            })
        }
        else if (otp !== recentOtp[0].otp) {
            //Invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        //save the entry in DB.
        const user = await User.create({
            firstName, lastName, email,
            password: hashedPassword, accountType,
            additionalDetails: profileDetails._id, otp,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success: true,
            message: 'User is Registered Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User is not Registered. Please try again"
        })
    }


}

//login

exports.Login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //check user exist or not
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Registered"
            })
        }

        // password match and create JWT token
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Login Successfull"
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failed. Try again"
        })
    }
}

// changePassword

exports.ChangePassword = async (req, res) => {
    try {
        //get data from req body
        const id = req.user.id;

        //get oldpass,newpass,confirm newpass
        const { email, oldPassword, newPassword, confirmPassword } = req.body;

        //validation
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //update pass in db
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        //send mail pass update
        try {
            const mailResponse = await MailSender(email, "Verification email from Pixel-Code", "Your password changed successfuly");
            console.log("Email sent successfully", mailResponse);
        } catch (error) {
            console.log("error occur while sending mail", error);
            throw error;
        }
        //return respose
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Password updation failed"
        })
    }
}
