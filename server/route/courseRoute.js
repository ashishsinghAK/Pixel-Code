const express = require('express');
const router = express.Router();

//course controller
const {createCourse,showAllCourses,getCourseDetail} = require('../controller/course');
//category controller
const {createCategory,showAllcategory,getCategoryDetail} = require('../controller/category');
//section controller
const {createSection,updateSection,deleteSection} = require("../controller/section");
//subsection 
const {createSubSection,updateSubSection,deleteSubSection} = require('../controller/subSection');
//rating controller
const {createRating,getAvgRating,getAllRating} = require('../controller/ratingAndreview');

//import middlewares
const {auth,isInstructor,isAdmin,isStudent} = require('../middleware/authMiddleware');

/*     course routes      */

//course can only be created by instructor
router.post('/createCourse',auth,isInstructor,createCourse);
//add section to course
router.post('/addSection',auth,isInstructor,createSection);
//update the section
router.post('/updateSection',auth,isInstructor,updateSection);
//delete the section
router.post('/deleteSection',auth,isInstructor,deleteSection);
//add sub section
router.post('/addSubSection',auth,isInstructor,createSubSection);
//update sub section
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
//delete sub section
router.post('/deleteSubSection',auth,isInstructor,deleteSubSection);

router.post('/createCategory',auth,isInstructor,createCategory);
router.get('/showAllCategory',showAllcategory);
router.get('/getCategoryDetail',getCategoryDetail);


/* Rating and Reviews*/
router.post('/createRating',auth,isStudent,createRating);
router.get('/getAverageRating',getAvgRating);
router.get('/getReview',getAllRating);


module.exports = router;