const router = require("express").Router();
const instructorController = require("../controllers/instructor");
const courseController = require("../controllers/course");

router.post("/addcourse/:id", courseController.createCourse);

router.get("/searchcourses/:id", courseController.searchCoursesByInstructor);

module.exports = router;
