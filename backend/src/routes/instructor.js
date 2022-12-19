const router = require("express").Router();
const instructorController = require("../controllers/instructor");
const courseController = require("../controllers/course");
const auth = require("../middleware/auth");

router.post("/addcourse",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.createCourse);

router.get("/searchcourses",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.searchCoursesByInstructor);

router.put("/updatecourse/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), courseController.updateCourse);

router.patch("/updateuser", instructorController.updateUser); //not needed

router.post("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.rateInstructor);

router.patch("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.editRating);

router.get("/rate/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), instructorController.getRating);

router.get("/amountowed",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]), instructorController.getMoneyOwed);

router.patch("/creatediscount/:id",auth.validateToken,auth.authenticateRole(["INSTRUCTOR"]),instructorController.setDiscount);

module.exports = router;
