const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');



router.post('/login', userController.login);

router.patch('/updateuser',auth.validateToken,auth.authenticateRole(["INSTRUCTOR","TRAINEE","CORPORATE"]), userController.updateUser);

router.patch("/changepassword", userController.changePassword);

router.post("/forgetpassword", userController.forgetPassword);

router.patch("/resetpassword",auth.validateToken, userController.resetPassword);

router.post('/register', userController.createUser);

router.post('/logout',auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE","INSTRUCTOR"]),userController.logout);

router.post('/enroll',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.registerToCourse);

router.patch('/opensource/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.openSource);

router.get('/progress/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getProgress);

router.patch('/notes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.addNotes);

router.delete('/notes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.deleteNote);

router.get('/sourcenotes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getSourceNotes);

router.get('/subtitlenotes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getSubtitleNotes);

router.get('/coursenotes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getCourseNotes);

router.post('/solveexam',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.solveExam);

router.get('/mycourses',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getRegisteredCourses);

router.get("/myprofile",auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE","INSTRUCTOR"]),userController.viewProfile);

module.exports=router;