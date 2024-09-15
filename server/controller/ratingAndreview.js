const RatingAndReview = require('../model/RatingAndReview');
const Course = require('../model/Course');
const User = require('../model/User');
const mongoose = require('mongoose');

//create rating
exports.createRating = async (req, res) => {
    try {
        //steps
        /*
        get userid
        check if user is enrolled or not
        check if user is already reviewed or not
        create rating and review
        update course with this rating
        return response
        */
        const userId = req.user.id; //maybe U of user can be capital
        const { rating, review, courseId } = req.body;
        const courseDetail = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } }
            }
        );
        if (!courseDetail) {
            return res.status(400).json({
                success: false,
                message: 'Student is not enrolled in the course'
            })
        };
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by user"
            })
        };

        const ratingReview = await RatingAndReview.create({
            rating, review, course: courseId, user: userId
        });
        const updatedDetail = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true }
        );
        console.log(updatedDetail);
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error encounter while creating rating and review"
        })
    }
}

//get average rating
exports.getAvgRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }  // here this field is explicitlly created
                }
            },
        ])

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }
        // if no rating yet
        return res.status(200).json({
            success: true,
            message: "No rating yet!",
            averageRating: 0
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Avg rating is not feched currently,try again",
        })
    }
}

// get all rating

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            }).populate({
                path: "course",
                select: "courseName"
            }).exec();

        return res.status(200).json({
            success: true,
            message: "All rating and reviews are fetched successfully",
            data: allReviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error! occur, while fetching all rating and reviews",
        })
    }
}

