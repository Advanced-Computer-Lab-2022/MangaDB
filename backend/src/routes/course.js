const router = require("express").Router();
const courseController = require("../controllers/course");
const auth = require("../middleware/auth");

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getCourse);

router.patch("/:id", courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

router.get("/rate/:id", courseController.getCourseRating);

router.post("/rate/:id", courseController.rateCourse);

router.patch("/rate/:id", courseController.editRating);

router.get("/mostviewed", courseController.getMostViewedCourses);

router.get("/mostrated", courseController.getMostRatedCourses);

router.post("/addsubtitle/:id", courseController.addSubtitle);

router.post("/askquestion/:id", courseController.askQuestion);





// router.get("/", courseController.getAllCourses);

// router.get("/:id", courseController.getCourse);

// router.patch("/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.updateCourse);

// router.delete("/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.deleteCourse);

// router.get("/rate/:id", courseController.getCourseRating);

// router.post("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), courseController.rateCourse);

// router.patch("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), courseController.editRating);

// router.get("/mostviewed", courseController.getMostViewedCourses);

// router.get("/mostrated", courseController.getMostRatedCourses);

// router.post("/addsubtitle/:id", courseController.addSubtitle);

module.exports = router;
