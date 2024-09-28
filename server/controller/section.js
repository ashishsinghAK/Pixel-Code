const Section = require('../model/Section');
const Course = require('../model/Course');

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
        if (existingSection) {
            return res.status(400).json({
                success: false,
                message: "There is already a Section Present for this Section_Name,try with another name"
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
            { new: true });

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
            //updatedSection
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
        await Section.findByIdAndDelete(sectionID);
        //course ko bhi to update kro.
        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionID }
        })
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error encounter, while deleting section try again"
        })
    }
}