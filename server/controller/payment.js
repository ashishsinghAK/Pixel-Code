
const { instance } = require('../config/razorpay');
const Course = require('../model/Course');
const User = require('../model/User');
const MailSender = require('../Util/MailSender');
const mongoose = require("mongoose");


//capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    try {
        //get course and user id
        const { courseId } = req.body;
        const userId = req.user.id;

        //validation
        if (!courseId) {
            return res.json({
                success: false,
                message: "This is not valid CourseId"
            })
        };
        //validate course detail
        let course;
        try {
            course = await Course.findById(courseId);
            if (!course) {
                return res.json({
                    success: false,
                    message: "Course not Found"
                })
            }
            //check if user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: true,
                    message: "Student is already enrolled"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        //order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId,
                userId
            }
        };

        try {
            //initiate the payment
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            //return response
            return res.json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbNail: course.thumbNail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            })
        } catch (err) {
            console.log(error);
            return res.json({
                success: false,
                message: "Payment initiation failed"
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Payment capturing failed"
        })
    }
}


// verify signature

exports.verifySignature = async (req, res) => {
    const webhookSecret = "Pixel-Code";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is authorised");

        const { courseId, userId } = req.body.payload.payment.entity.notes;
        try {
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            );
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                })
            };
            console.log(enrolledCourse);

            //find the student and append the course into it
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            )
            console.log(enrolledStudent);
            //send confirmation mail
            const mailResponse = await MailSender(
                enrolledStudent.email,
                "Congratulations from Pixel-Code",
                `Congratulations, ${enrolledStudent.firstName} for purchasing new 
                ${enrolledCourse.courseName} Course from Pixel-Code. Happy Learning and
                Keep Growing`
            )

            console.log(mailResponse);

            return res.status(200).json({
                success: true,
                message: "Signature verified and course added"
            })


        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Invalid Request"
        })
    }
}