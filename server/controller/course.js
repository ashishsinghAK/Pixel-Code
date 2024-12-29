const Course = require('../model/Course');
const Category = require('../model/Category');
const User = require('../model/User');
const { uploadImage } = require('../Util/imageUploader');
const MailSender = require('../Util/MailSender');
const CourseProgress = require('../model/CourseProgress');
const convertSecondsToDuration = require("../Util/setToDuration")
require('dotenv').config();

//create course handler function

exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, categoryId, tag } = req.body;
        //get thumbnail 
        const thumbnail = req.files.thumbNail;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !categoryId || !thumbnail) {
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
        const categoryDetail = await Category.findById(categoryId);
        if (!categoryDetail) {
            return res.status(401).json({
                success: false,
                message: "Category detail not found"
            })
        };

        //upload to cloudinary
        const thumbnailImage = await uploadImage(thumbnail, process.env.FOLDER_NAME);

        //check if the course is already created or not
        const existingCourse = await Course.findOne({
            courseName: courseName,
            instructor: instructorDetail._id
        });

        if (existingCourse) {
            return res.status(400).json({
                success: false,
                message: "This course is alredy created"
            })
        }

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
            thumbNail: thumbnailImage.secure_url,
            tag,
            status: "Published"
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

        await Category.findByIdAndUpdate({ _id: categoryId }, {
            $push: {
                courses: newCourse._id
            }
        },
            { new: true })

        //update the tag schema

        return res.status(200).json({
            success: true,
            message: "New Course is created",
            newCourse
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
            studentsEnrolled: true,
            courseDescription: true,
            whatYouWillLearn: true,
            courseContent: true
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
        const courseDetail = await Course.findOne(
            { _id: courseId }
        ).populate({
            path: "studentsEnrolled"
        }).populate({
            path: "instructor",
            select: "firstName lastName"
            // populate: {
            //     path: "additionalDetails"
            // }
        }).populate({
            path: "category",
        }).populate({
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


exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetail = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent", // Refers to "Section" in the Course schema
                    populate: {
                        path: "subSection", // Refers to "SubSection" in the Section schema
                    },
                },
            })
            .exec();

            userDetail = userDetail.toObject()
            var subSectionLength = 0
            for(var i=0;i<userDetail.courses.length;i++){
                let totalDurationInSecond = 0;
                subSectionLength=0
                for(var j=0;j<userDetail.courses[i].courseContent.length;j++){
                    totalDurationInSecond +=userDetail.courses[i].courseContent[j].subSection.reduce((acc,curr) => acc+parseInt(curr.timeDuration),0)
                    userDetail.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSecond)
                    subSectionLength += userDetail.courses[i].courseContent[j].subSection.length
                }
                let courseProgressCount = await CourseProgress.findOne({
                    courseID:userDetail.courses[i]._id,
                    userId:userId
                })
                courseProgressCount = courseProgressCount?.completedVideo.length
                if(subSectionLength === 0){
                    userDetail.courses[i].progressPercentage = 100
                }
                else{
                    const multiplier = Math.pow(10,2)
                    userDetail.courses[i].progressPercentage = Math.round(
                        (courseProgressCount/subSectionLength)*100*multiplier
                    )/multiplier
                }
            }
            //video 8 time 41:06

        if (!userDetail) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with ${userId}`
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetail.courses
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
        //get the instructor id
        const InstructorId = req.user.id;
        // find all courses created by the instructor.
        const InstructorCourses = await Course.find({
            instructor: InstructorId
        }).sort({ createdAt: -1 })
        //Return the instructor courses
        return res.status(200).json({
            success: true,
            InstructorCourses
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.EnrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }


        const isAlreadyEnrolled = course.studentsEnrolled.includes(userId);
        if (isAlreadyEnrolled) {
            return res.status(409).json({
                success: false,
                message: "You are already enrolled in this course",
            });
        }


        const CourseEnrolled = await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentsEnrolled: userId } },
            { new: true }
        );

        // const courseProgress = await CourseProgress.create({
        //     courseID: courseId,
        //     userId: userId,
        //     completedVideo: []
        // })

        const StudentEnrolled = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: courseId,
                    // courseProgress: courseProgress._id
                }
            },
            { new: true }
        );

        // Send the confirmation email
        const mailResponse = await MailSender(
            StudentEnrolled.email,
            "Congratulations from Pixel-Code",
            `Congratulations, ${StudentEnrolled.firstName}, 
            for purchasing the ${CourseEnrolled.courseName} course from Pixel-Code. 
            Happy Learning and Keep Growing!`
        );

        return res.status(200).json({
            success: true,
            message: "Course enrolled successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
