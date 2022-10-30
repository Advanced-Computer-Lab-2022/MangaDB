const router = require('express').Router();
const userController=require('../controllers/user');

router.post('/adduser', userController.createUser);

router.get('/getusers', userController.getAllUsers);


router.delete*('/deleteuser/:id', userController.deleteUser);

module.exports=router;