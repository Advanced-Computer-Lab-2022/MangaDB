const router = require("express").Router();
const courseController = require("../controllers/course");

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getCourse);

router.patch("/:id", courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

router.post("/rate/:id", courseController.rateCourse);

router.patch("/rate/:id", courseController.editRating);

router.get("/mostviewed", courseController.getMostViewedCourses);

router.get("/mostrated", courseController.getMostRatedCourses);

module.exports = router;
