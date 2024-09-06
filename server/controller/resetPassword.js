const User = require('../model/User');
const {MailSender} = require('../Util/MailSender');
const bcrypt = require('bcrypt');


//reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const { email } = req.body;
        //validation
        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Please provide all fields"
            })
        }

        //check user exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not a Registered user"
            })
        }

        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time

        /*
         here token is inserted in user entry because while user has fill new pass and confi
         pass then to know which user is requested for pass change , for this
         we can find the user by using token value because we get a token value 
         from frontend also then we can easily match the token values. if we carefully
         see the url the can understand the token is pass into the url
        */
        const updatedDetails = await User.findOneAndUpdate({ email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true });
        //create url for password reset
        const url = `https://localhost:5173/update-password/${token}`;
        //send mail containing the url
        await MailSender(email, "Password Reset Link:", `Your Password Reset Link is: ${url}`);
        return res.json({
            success: true,
            message: "Email sent successfully, Click on the link to change password"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while Reset password token generating"
        })
    }
}

//reset password in DB

exports.resetPassword = async (req, res) => {
    try {
        //data fetch
        const { password, confirmPaddword, token } = req.body;
        // validation
        if (password !== confirmPaddword) {
            return res.json({
                success: false,
                message: "Both the fields need to be same"
            })
        };
        //get user detail from db using token
        const userDetails = await User.findOne({ token: token });
        //if noentry- invalid token
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Invalid token, try again"
            })
        };
        // check expiry time of token
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Token is expired, try again"
            })
        };

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //password update
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );

        return res.status(200).json({
            success: false,
            message: "Password Reset successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Password updation failed,try again"
        })

    }
}