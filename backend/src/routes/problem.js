const router = require("express").Router();
const auth = require("../middleware/auth");
const problemController = require("../controllers/problem");


router.get("/unresolvedProblem/:id", problemController.getUnresolvedUserProblems); //not used

router.post("/",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE","INSTRUCTOR"]), problemController.createProblem);

router.get("/",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.getProblems);

router.get("/userCourseProblems/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE","INSTRUCTOR"]),problemController.getUserCourseProblems);

router.get("/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), problemController.getProblem);

router.delete("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.deleteProblem); 

router.patch("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.updateProblem);

router.patch("/followUp/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE","INSTRUCTOR"]), problemController.followUpProblem);

router.get("/user",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE","INSTRUCTOR"]), problemController.getUserProblems);

router.get("/course/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE","INSTRUCTOR"]), problemController.getCourseProblems);

module.exports = router;
