const mongoose = require('mongoose');

const courseProgress = new mongoose.Schema({

    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // },
    completedVideo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSections"
        }
    ]
});

module.exports = mongoose.model("CourseProgress", courseProgress);