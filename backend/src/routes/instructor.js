const router=require('express').Router();
const instructorController=require('../controllers/instructor');
const courseController=require('../controllers/course');

router.get("/getcourse/:id",instructorController.getInstructorCourseTitles);

router.post("/addcourse/:id",courseController.createCourse);

module.exports=router;