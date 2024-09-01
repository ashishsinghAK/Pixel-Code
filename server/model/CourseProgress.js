const mongoose = require('mongoose');

const courseProgress = new mongoose.Schema({

    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    completedVideo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSections"
        }
    ]
});

module.exports = mongoose.model("CourseProgress", courseProgress);