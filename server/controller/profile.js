const Profile = require('../model/Profile');
const User = require('../model/User');
const Course = require("../model/Course");

exports.updateProfile = async (req, res) => {
    try {
        //fetch data
        const { dateOfBirth, about, contactNumber, gender } = req.body;
        const id = req.user.id;

        //validation
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        };

        //find profile
        const user = await User.findById(id);
        const profileId = user.additionalDetails;
        const profileDetail = await Profile.findById(profileId);

        //update profile
        profileDetail.dateOfBirth = dateOfBirth;
        profileDetail.gender = gender;
        profileDetail.about = about;
        profileDetail.contactNumber = contactNumber;
        await profileDetail.save();
        //here save function is used because profile object is created earlier
        // while signUp

        return res.status(200).json({
            success: true,
            message: "Profile updation done",
            profileDetail
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Profile updation failed,try again"
        })
    }
}


// delete account

exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        };
        //delete profile
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        await User.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Account Deletion failed, try again"
        })
    }
}


//get user detail

exports.getUserDetail = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetail = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success: true,
            message: "User detail fetched successfully",
            userDetail
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occur while fetching the details of user"
        })
    }
}

exports.InstructorDetail = async (req, res) => {
    try {
        const InstructorId = req.user.id;

        const courseDetail = await Course.find({ instructor: InstructorId })
        if (!courseDetail) {
            return res.status(401).json({
                success: false,
                message: "Course not found"
            })
        }
        const courseData = courseDetail.map((course) => {
            const totalStudent = course.studentsEnrolled.length;
            const totalAmount = totalStudent * course.price;

            //create a new object with the additional feilds 
            const anotherInfo = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudent,
                totalAmount
            }
            return anotherInfo;
        })
        return res.status(200).json({
            success: true,
            course: courseData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cound not find the details"
        })
    }
}