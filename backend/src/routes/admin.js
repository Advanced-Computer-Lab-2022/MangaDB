const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/adduser',auth.validateToken,auth.authenticateRole(["ADMIN"]), userController.createUser);

router.get('/getusers',auth.validateToken,auth.authenticateRole(["ADMIN"]),userController.getAllUsers);

router.delete('/deleteuser/:id',auth.validateToken,auth.authenticateRole(["ADMIN"]), userController.deleteUser);

router.get('/getuser/:id',auth.validateToken,auth.authenticateRole(["ADMIN"]), userController.getUserById);

router.patch("/creatediscount/",auth.validateToken,auth.authenticateRole(["ADMIN"]),userController.setDiscount);

module.exports=router;