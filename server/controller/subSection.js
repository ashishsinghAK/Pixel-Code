const SubSection = require('../model/SubSection');
const Section = require('../model/Section');
const { uploadImage,uploadVideo } = require('../Util/imageUploader');
require('dotenv').config();

//create subSection

exports.createSubSection = async (req, res) => {
    try {
        //fetch data
        const { title, timeDuration, description, sectionID } = req.body;
        const videoUrl = req.files.videoUrl;
        //validation
        if (!videoUrl || !title || !timeDuration || !description || !sectionID) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //video upload to cludinary
        const uploadDetail = await uploadVideo(videoUrl, process.env.FOLDER_NAME);

        console.log( uploadDetail.secure_url);
        
        //create a subsection
        const subSectionDetail = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
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
        );
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            updatedSection
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
        const { SubSectionID } = req.params;
        await SubSection.findByIdAndDelete(SubSectionID);
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while deleting SubSection"
        })
    }
}