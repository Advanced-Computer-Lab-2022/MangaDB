const router = require("express").Router();
const auth = require("../middleware/auth");
const problemController = require("../controllers/problem");

router.post("/", problemController.createProblem);

router.get("/", problemController.getProblems);

router.get("/:id", problemController.getProblem);

router.delete("/:id", problemController.deleteProblem); 

router.patch("/:id", problemController.updateProblem);

router.patch("/followup/:id", problemController.followUpProblem);

router.get("/user/:id", problemController.getUserProblems);

router.get("/course/:id", problemController.getCourseProblems);

module.exports = router;


