const router = require("express").Router();
const auth = require("../middleware/auth");
const requestController = require("../controllers/request");


router.post("/refund", requestController.requestRefund);

router.post("/access", requestController.requestCourseAccess);

router.get("/",requestController.getRequests);

router.patch("/refund/:id", requestController.approveRefund);

router.patch("/access/:id", requestController.grantAccess);

router.patch("/reject/:id", requestController.declineRequest);

router.delete("/:id", requestController.deleteRequest);

module.exports = router;