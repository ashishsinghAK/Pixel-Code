// const SubSection = require("../model/SubSection")
// const CourseProgress = require("../model/CourseProgress")


// exports.updateCourseProgress = async (req, res) => {
//     const { courseId, subSectionId } = req.body;
//     const userId = req.user.id;

//     try {
//         // check if subsecion is valid
//         const trimmedSubSectionId = subSectionId.trim();

//         const subSection = await SubSection.findById(trimmedSubSectionId);
//         if (!subSection) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Invalid SubSection"
//             })
//         }
//         //check for previous entry
//         const progress = await CourseProgress.findOne({
//             courseID: courseId,
//             userId: userId
//         })
//         if (!progress) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course progress doesn't exist"
//             })
//         }
//         else {
//             if (progress.completedVideo.includes(trimmedSubSectionId)) {
//                 // return res.status(400).json({
//                 //     error: "Sub-Section already included"
//                 // })
//                 return res.status(200).json({
//                     success:true,
//                     data:progress.completedVideo.length
//                 })
//             }
//             // push into the course video
//             progress.completedVideo.push(trimmedSubSectionId)
//         }
//         await progress.save();
//         return res.status(200).json({
//             success: true,
//             data:progress.completedVideo.length
//             // message: "Course Successfully added"
//         })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Error in courseProgress"
//         })
//     }
// }