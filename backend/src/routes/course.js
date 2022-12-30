const router = require("express").Router();
const courseController = require("../controllers/course");
const auth = require("../middleware/auth");

router.get("/",auth.validateToken, courseController.getAllCourses);

router.patch("/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.updateCourse);

router.delete("/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.deleteCourse);

router.get("/rate/:id", courseController.getCourseRating);

router.post("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), courseController.rateCourse);

router.patch("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), courseController.editRating);

router.get("/mostViewed", courseController.getMostViewedCourses);

router.get("/mostRated", courseController.getMostRatedCourses);

router.post("/addSubtitle/:id", courseController.addSubtitle);

router.post("/askQuestion/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), courseController.askQuestion);

router.get("/discountedCourses", courseController.getDiscountedCourses);

router.get("/:id",auth.validateToken, courseController.getCourse);

module.exports = router;