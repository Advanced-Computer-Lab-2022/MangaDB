const router = require("express").Router();
const instructorController = require("../controllers/instructor");
const courseController = require("../controllers/course");

router.post("/addcourse/:id", courseController.createCourse);

router.get("/searchcourses/:id", courseController.searchCoursesByInstructor);

router.put("/updatecourse/:id", courseController.updateCourse);

router.patch("/updateuser/:id", instructorController.updateUser);

router.patch("/rate/:id", instructorController.rateInstructor);

module.exports = router;
