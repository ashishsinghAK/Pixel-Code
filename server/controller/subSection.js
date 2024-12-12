const SubSection = require('../model/SubSection');
const Section = require('../model/Section');
const { uploadImage, uploadVideo } = require('../Util/imageUploader');
const Course = require('../model/Course');
require('dotenv').config();

//create subSection

exports.createSubSection = async (req, res) => {
    try {
        //fetch data
        const { title, description, sectionID,courseID } = req.body;
        const videoUrl = req.files.videoUrl;
        console.log(title,description,sectionID,courseID)
        console.log(videoUrl)
        //validation
        if (!videoUrl || !title || !description || !sectionID || !courseID) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingSubSection = await SubSection.findOne({
            description: description,
            title: title,
            section:sectionID
        })
        if (existingSubSection) {
            return res.status(400).json({
                success: false,
                message: "This Sub_Section is already created"
            })
        }

        //video upload to cludinary
        const uploadDetail = await uploadVideo(videoUrl, process.env.FOLDER_NAME);



        //create a subsection
        const subSectionDetail = await SubSection.create({
            title: title,
            // timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetail.secure_url,
        });

        //update section with subsection objectID
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionID },
            {
                $push: {
                    subSection: subSectionDetail._id,
                }
            },
            { new: true }
        ).populate({
            path: "subSection",
        });

        const updatedCourse = await Course.findById(courseID).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        console.log(updatedCourse)
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            updatedCourse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occur while creating subsection"
        })
    }
}

//update subsection
exports.updateSubSection = async (req, res) => {
    try {
        //data input
        const { SubSectionID, title, description, videoUrl } = req.body;
        //validation
        if (!SubSectionID || !title || !description || !videoUrl) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const updatedDetail = await SubSection.findByIdAndUpdate(SubSectionID, { title, description, videoUrl }, { new: true });
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            //updatedDetail
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while updating SubSection"
        })
    }
}


//delete subsection

exports.deleteSubSection = async (req, res) => {
    try {
        const { SubSectionID, sectionID, courseID } = req.body;
        if (!SubSectionID) {
            return res.status(400).json({
                success: false,
                message: "Invalid SubSection"
            })
        }
        if (!sectionID) {
            return res.status(400).json({
                success: false,
                message: "Invalid Section"
            })
        }
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Invalid Course"
            })
        }


        //is sub section ko section me se bhi to delete kro
        await Section.findByIdAndUpdate(sectionID, {
            $pull: { subSection: SubSectionID }
        }, { new: true })

        await SubSection.findByIdAndDelete(SubSectionID);


        const updatedCourse = await Course.findById(courseID).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            updatedCourse
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while deleting SubSection"
        })
    }
}