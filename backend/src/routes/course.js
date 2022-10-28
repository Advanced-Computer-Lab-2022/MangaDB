const router = require("express").Router();
const courseController = require("../controllers/course");

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getCourse);

router.patch("/:id", courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

module.exports = router;
