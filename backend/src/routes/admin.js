const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/addUser',auth.validateToken,auth.authenticateRole(["ADMIN"]), userController.createUser);

router.get('/getUsers',auth.validateToken,auth.authenticateRole(["ADMIN"]),userController.getAllUsers);

router.delete('/deleteUser/:id',auth.validateToken,auth.authenticateRole(["ADMIN"]), userController.deleteUser);

router.get('/getUser/:id',auth.validateToken,auth.authenticateRole(["ADMIN"]), userController.getUserById);

router.patch("/createDiscount/",auth.validateToken,auth.authenticateRole(["ADMIN"]),userController.setDiscount);

module.exports=router;