const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/login', userController.login);

router.patch('/updateUser',auth.validateToken,auth.authenticateRole(["INSTRUCTOR","TRAINEE","CORPORATE"]), userController.updateUser);

router.patch("/changePassword",auth.validateToken,auth.authenticateRole(["INSTRUCTOR","TRAINEE","CORPORATE"]), userController.changePassword);

router.post("/forgetPassword", userController.forgetPassword);

router.patch("/resetPassword",auth.validateToken, userController.resetPassword);

router.post('/register', userController.createUser);

router.post('/logout',auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE","INSTRUCTOR"]),userController.logout);

router.post('/enroll',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.registerToCourse);

router.patch('/openSource/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.openSource);

router.get('/progress/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getProgress);

router.patch('/notes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.addNotes);

router.delete('/notes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.deleteNote);

router.get('/sourceNotes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getSourceNotes);

router.get('/subtitleNotes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getSubtitleNotes);

router.get('/courseNotes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getCourseNotes);

router.post('/solveExam',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.solveExam);

router.get('/myCourses',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getRegisteredCourses);

router.get('/wallet',auth.validateToken,auth.authenticateRole(["TRAINEE"]),userController.getWallet);

router.get("/myProfile",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE","INSTRUCTOR"]),userController.viewProfile);

router.post("/sendCertificate",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.sendCertificate);

module.exports=router;