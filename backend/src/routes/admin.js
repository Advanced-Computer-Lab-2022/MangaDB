const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/adduser', userController.createUser);

router.get('/getusers',auth.validateToken,auth.authenticateRole(["ADMIN"]),userController.getAllUsers);


router.delete('/deleteuser/:id', userController.deleteUser);

router.get('/getuser/:id', userController.getUserById);


module.exports=router;