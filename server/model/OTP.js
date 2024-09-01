const mongoose = require('mongoose');
const MailSender = require('../Util/MailSender');


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
});

// pre-middleware for nodemailer
async function sendVerificationMail(email,otp){
    try{
        const mailResponse = await MailSender(email,"Verification email from Pixel-Code",otp);
        console.log("Email sent successfully",mailResponse);
    }catch(error){
        console.log("error occur while sending mail",error);
        throw error;
    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationMail(this.email,this.otp);
    next();
})
module.exports = mongoose.model("OTP", OTPSchema);