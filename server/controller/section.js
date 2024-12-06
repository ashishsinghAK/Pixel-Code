const Section = require('../model/Section');
const Course = require('../model/Course');
const SubSection = require('../model/SubSection');

//create section

exports.createSection = async (req, res) => {
    try {
        // data fetch
        // here courseId is present because section is created after course is crceated.
        const { sectionName, courseId } = req.body;
        //data validation
        if (!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        };

        const existingSection = await Section.findOne({
            sectionName: sectionName,
        })
        // if (existingSection) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "There is already a Section Present for this Section_Name,try with another name"
        //     })
        // }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found"
            })
        }

        const duplicateCourse = course.courseContent.some(
            (sectionID) => sectionID.toString() === existingSection?._id?.toString()
        )
        if (duplicateCourse) {
            return res.status(400).json({
                success: false,
                message: "Section with this name already exist"
            })
        }
        //create section
        const newSection = await Section.create({ sectionName });
        //update course with section objectID
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    //here object id of newSection is passed
                    courseContent: newSection._id,
                },
            },
            { new: true }).populate({
                path: "courseContent",
                populate:{
                    path:"subSection"
                }
            });

        // return respouse
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while creating section"
        })
    }
}

//update section

exports.updateSection = async (req, res) => {
    try {
        //data input
        const { sectionName, sectionID } = req.body;
        //data validation
        if (!sectionName || !sectionID) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionID, { sectionName }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedSection
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while updating section"
        })
    }
}

//delete section

exports.deleteSection = async (req, res) => {
    try {
        const { sectionID, courseId } = req.body;
        
        if (!courseId && !sectionID) {
            return res.status(400).json({
                success: false,
                message: "Section and Course is required"
            })
        }
        const pulledCourse = await Course.findByIdAndUpdate(courseId,
            {
                $pull: { courseContent: sectionID }
            },
            { new: true })


        const section = await Section.findById(sectionID)
        //delete sub sections also
        await SubSection.deleteMany({ _id: { $in: section.subSection } })

        await Section.findByIdAndDelete(sectionID);
        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            updatedCourse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while deleting section try again"
        })
    }
}