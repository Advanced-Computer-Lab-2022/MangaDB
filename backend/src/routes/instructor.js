const router = require("express").Router();
const instructorController = require("../controllers/instructor");
const courseController = require("../controllers/course");

router.post("/addcourse/:id", courseController.createCourse);

router.get("/searchcourses/:id", courseController.searchCoursesByInstructor);

router.put("/updatecourse/:id", courseController.updateCourse);//not needed

router.patch("/updateuser/:id", instructorController.updateUser); //not needed

router.post("/rate/:id", instructorController.rateInstructor);

router.patch("/rate/:id", instructorController.editRating);

router.get("/rate/:id", instructorController.getInstructorRating);

router.get("/amountowed/:id", instructorController.getMoneyOwed);

router.patch("/creatediscount/:id",instructorController.setDiscount);

router.get("/Questions/:id",courseController.getInstructorQuestions);

router.patch("/answerQuestion",courseController.answerQuestion);

router.get("/:id",instructorController.viewInstructor);

router.get("/myReviews/:id",instructorController.viewMyReviews);


// router.post("/addcourse/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.createCourse);

// router.get("/searchcourses/:id",,auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.searchCoursesByInstructor);

// router.put("/updatecourse/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.updateCourse);

// router.patch("/updateuser/:id", instructorController.updateUser); //not needed

// router.post("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.rateInstructor);

// router.patch("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.editRating);

// router.get("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.getRating);

// router.get("/amountowed/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), instructorController.getMoneyOwed);

// router.patch("/creatediscount/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]),instructorController.setDiscount);

module.exports = router;
