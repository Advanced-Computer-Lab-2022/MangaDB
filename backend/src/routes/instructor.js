const router = require("express").Router();
const instructorController = require("../controllers/instructor");
const courseController = require("../controllers/course");
const auth = require("../middleware/auth");

router.post("/addCourse",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.createCourse);

router.get("/searchCourses",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.searchCoursesByInstructor);

router.put("/updateCourse/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.updateCourse);

router.patch("/updateUser", instructorController.updateUser); //not needed

router.post("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.rateInstructor);

router.patch("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.editRating);

router.get("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.getInstructorRating);

router.get("/amountOwed",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), instructorController.getMoneyOwed);

router.patch("/createDiscount/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]),instructorController.setDiscount);

router.get("/questions",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]),courseController.getInstructorQuestions);

router.patch("/answerQuestion",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]),courseController.answerQuestion);



module.exports = router;
