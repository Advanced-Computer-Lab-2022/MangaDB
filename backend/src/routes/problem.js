const router = require("express").Router();
const auth = require("../middleware/auth");
const problemController = require("../controllers/problem");




router.post("/",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), problemController.createProblem);

router.get("/",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.getProblems);

router.get("/usercourseproblems/:id",problemController.getUserCourseProblems);

router.get("/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), problemController.getProblem);

router.delete("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.deleteProblem); 

router.patch("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.updateProblem);

router.patch("/followup/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), problemController.followUpProblem);

router.get("/user",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), problemController.getUserProblems);

router.get("/course/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), problemController.getCourseProblems);

module.exports = router;


