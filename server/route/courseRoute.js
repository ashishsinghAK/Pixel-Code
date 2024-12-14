const express = require('express');
const router = express.Router();

//course controller
const { createCourse, showAllCourses, getCourseDetail, getEnrolledCourses, getInstructorCourses } = require('../controller/course');
//category controller
const { createCategory, showAllcategory, getCategoryDetail } = require('../controller/category');
//section controller
const { createSection, updateSection, deleteSection } = require("../controller/section");
//subsection 
const { createSubSection, updateSubSection, deleteSubSection } = require('../controller/subSection');
//rating controller
const { createRating, getAvgRating, getAllRating } = require('../controller/ratingAndreview');

//import middlewares
const { auth, isInstructor, isAdmin, isStudent } = require('../middleware/authMiddleware');

/*     course routes      */

//course can only be created by instructor
router.post('/createCourse', auth, isInstructor, createCourse);

router.get('/showAllCourse', auth, showAllCourses);
router.post('/getCourseDetail', getCourseDetail);
router.get('/getEnrolledCourse', auth, getEnrolledCourses);
router.get("/InstructorCourses", auth, isInstructor, getInstructorCourses);

//add section to course
router.post('/addSection', auth, isInstructor, createSection);
//update the section
router.post('/updateSection', auth, isInstructor, updateSection);
//delete the section
router.delete('/deleteSection', auth, isInstructor, deleteSection);
//add sub section
router.post('/addSubSection', auth, isInstructor, createSubSection);
//update sub section
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
//delete sub section
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);

router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategory', showAllcategory);
router.post('/getCategoryDetail', getCategoryDetail);


/* Rating and Reviews*/
router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating', auth, getAvgRating);
router.get('/getAllRating', auth, getAllRating);


module.exports = router;