const Course = require('../model/Course');
const Category = require('../model/Category');
const User = require('../model/User');
const { uploadImage } = require('../Util/imageUploader');
require('dotenv').config();

//create course handler function

exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbNail;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(401).json({
                success: false,
                message: "All fields are mandatory"
            })
        };

        //check for instructor and validation
        const userId = req.user.id;
        const instructorDetail = await User.findById(userId);
        console.log("instructorDetail", instructorDetail);
        if (!instructorDetail) {
            return res.status(401).json({
                success: false,
                message: "Instructor details not found"
            })
        }

        //check for tag is valid or not
        const categoryDetail = await Category.findById(tag);
        if (!categoryDetail) {
            return res.status(401).json({
                success: false,
                message: "Category detail not found"
            })
        };

        //upload to clodinary
        const thumbnailImage = await uploadImage(thumbnail, process.env.FOLDER_NAME);

        //create entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            //here instructor ki object id insert ki gyi hai
            instructor: instructorDetail._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            //here tag ki object id insert ki gyi hai
            category: categoryDetail._id,
            thumbNail: thumbnailImage.secure_url
            // or
            // thumbnail:thumbnailImage.secure_url
        })

        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetail._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true }
        )

        //update the tag schema

        return res.status(200).json({
            success: true,
            message: "New Course is created"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can't create the course, try again"
        })
    }
}

//get all courses handler function

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbNail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data of all courses fetched successfully",
            data: allCourses
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Can't fetch all course detail"
        })
    }
}

//get courseDetail

exports.getCourseDetail = async (req, res) => {
    try {
        const { courseId } = req.body;
        //find course detail
        const courseDetail = await Course.find(
            { _id: courseId }
        ).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        }).populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }).exec();

        //validation
        if (!courseDetail) {
            return res.status(400).json({
                success: false,
                message: `Cannot find the course with id ${courseId}`,
            })
        };

        //return response
        return res.status(200).json({
            success: true,
            message: "Course detail fetched successfully",
            data: courseDetail
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occur while fetching course detail",
        })
    }
}

