const router = require("express").Router();
const auth = require("../middleware/auth");
const problemController = require("../controllers/problem");

router.post("/", problemController.createProblem);

router.get("/", problemController.getProblems);

router.get("/:id", problemController.getProblem);

router.get("/usercourseproblems/:id",problemController.getUserCourseProblems);

router.delete("/:id", problemController.deleteProblem); 

router.patch("/:id", problemController.updateProblem);

router.patch("/followup/:id", problemController.followUpProblem);

router.get("/user/:id", problemController.getUserProblems);

router.get("/course/:id", problemController.getCourseProblems);


// router.post("/",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), problemController.createProblem);

// router.get("/",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.getProblems);

// router.get("/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), problemController.getProblem);

// router.delete("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.deleteProblem); 

// router.patch("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), problemController.updateProblem);

// router.patch("/followup/:id",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), problemController.followUpProblem);

// router.get("/user/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), problemController.getUserProblems);

// router.get("/course/:id",auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), problemController.getCourseProblems);

module.exports = router;


