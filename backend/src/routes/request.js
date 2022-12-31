const router = require("express").Router();
const auth = require("../middleware/auth");
const requestController = require("../controllers/request");


router.post("/refund",auth.validateToken,auth.authenticateRole(["TRAINEE"]), requestController.requestRefund);

router.post("/access",auth.validateToken,auth.authenticateRole(["CORPORATE"]), requestController.requestCourseAccess);

router.get("/",auth.validateToken,auth.authenticateRole([ 'ADMIN' ]),requestController.getRequests);

router.get("/user",auth.validateToken,auth.authenticateRole(["TRAINEE", "CORPORATE"]), requestController.getUserRequests);

router.get("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]),requestController.getRequest);

router.patch("/refund/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.approveRefund);

router.patch("/access/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.grantAccess);

router.patch("/reject/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.declineRequest);

router.patch("/pend/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.pendRequest);

router.get("/user",auth.validateToken,auth.authenticateRole(["TRAINEE", "CORPORATE"]), requestController.getUserRequests);

router.delete("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.deleteRequest);

module.exports = router;