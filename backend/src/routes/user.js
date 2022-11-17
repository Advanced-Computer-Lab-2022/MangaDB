const router = require('express').Router();
const userController=require('../controllers/user');

router.post('/login', userController.login);

router.patch('/updateuser/:id', userController.updateUser);

router.patch("/changepassword/:id", userController.changePassword);

router.post("/forgetpassword", userController.forgetPassword);

router.patch("/resetpassword/:id", userController.resetPassword);


module.exports=router;