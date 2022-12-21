const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/login', userController.login);

router.patch('/updateuser/:id', userController.updateUser);

router.patch("/changepassword/:id", userController.changePassword);

router.post("/forgetpassword", userController.forgetPassword);

router.patch("/resetpassword/:id",auth.validateToken, userController.resetPassword);

router.post('/register', userController.createUser);

router.post('/logout',userController.logout);

router.post('/enroll',userController.registerToCourse);

router.patch('/opensource/:id',userController.openSource);

router.get('/progress/:id',userController.getProgress);

router.patch('/notes/:id',userController.addNotes);

router.delete('/notes',userController.deleteNote);

router.get('/sourcenotes/:id',userController.getSourceNotes);

router.get('/subtitlenotes/:id',userController.getSubtitleNotes);

router.get('/coursenotes/:id',userController.getCourseNotes);

router.post('/solveexam',userController.solveExam);

router.get('/mycourses/:id',userController.getRegisteredCourses);

router.get('/wallet/:id',userController.getWallet);


// router.post('/login', userController.login);

// router.patch('/updateuser/:id',auth.validateToken,auth.authenticateRole(["INSTRUCTOR","TRAINEE","CORPORATE"]), userController.updateUser);

// router.patch("/changepassword/:id", userController.changePassword);

// router.post("/forgetpassword", userController.forgetPassword);

// router.patch("/resetpassword/:id",auth.validateToken, userController.resetPassword);

// router.post('/register', userController.createUser);

// router.post('/logout',auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE","INSTRUCTOR"]),userController.logout);

// router.post('/enroll',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.registerToCourse);

// router.patch('/opensource/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.openSource);

// router.get('/progress/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getProgress);

// router.patch('/notes/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.addNotes);

//router.delete('/notes',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.deleteNote);

// router.get('/sourcenotes/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getSourceNotes);

// router.get('/subtitlenotes/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getSubtitleNotes);

// router.get('/coursenotes/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getCourseNotes);

// router.post('/solveexam',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.solveExam);

// router.get('/mycourses/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]),userController.getRegisteredCourses);

module.exports=router;