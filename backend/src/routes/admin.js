const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/adduser', userController.createUser);

router.get('/getusers',userController.getAllUsers);


router.delete('/deleteuser/:id', userController.deleteUser);

router.get('/getuser/:id', userController.getUserById);


module.exports=router;