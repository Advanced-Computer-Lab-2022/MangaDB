const router = require("express").Router();
const auth = require("../middleware/auth");
const requestController = require("../controllers/request");


router.post("/refund", requestController.requestRefund);

router.post("/access", requestController.requestCourseAccess);

router.get("/",requestController.getRequests);

router.get("/:id",requestController.getRequest);

router.patch("/refund/:id", requestController.approveRefund);

router.patch("/access/:id", requestController.grantAccess);

router.patch("/reject/:id", requestController.declineRequest);

router.delete("/:id", requestController.deleteRequest);

router.patch("/pend/:id", requestController.pendRequest);

router.get("/user/:id", requestController.getUserRequests);

// router.post("/refund",auth.validateToken,auth.authenticateRole(["TRAINEE"]), requestController.requestRefund);

// router.post("/access",auth.validateToken,auth.authenticateRole(["CORPORATE"]), requestController.requestCourseAccess);

// router.get("/",auth.validateToken,auth.authenticateRole(["ADMIN"]),requestController.getRequests);

// router.get("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]),requestController.getRequest);

// router.patch("/refund/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.approveRefund);

// router.patch("/access/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.grantAccess);

// router.patch("/reject/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.declineRequest);

// router.delete("/:id",auth.validateToken,auth.authenticateRole(["ADMIN"]), requestController.deleteRequest);

module.exports = router;