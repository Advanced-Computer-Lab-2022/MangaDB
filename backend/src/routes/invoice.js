const router = require('express').Router();
const invoiceController=require('../controllers/invoice');
const auth = require('../middleware/auth');



router.post('/:id',auth.validateToken,auth.authenticateRole(["TRAINEE","CORPORATE"]), invoiceController.issueInvoice);

router.get('/:id',auth.validateToken,auth.authenticateRole(["ADMIN"]), invoiceController.getInvoice);

router.get('/',auth.validateToken,auth.authenticateRole(["ADMIN"]), invoiceController.getAllInvoices);

router.get('/user',auth.validateToken,auth.authenticateRole(["ADMIN","TRAINEE","CORPORATE"]), invoiceController.getAllUserInvoices);

router.delete('/:id',auth.validateToken,auth.authenticateRole(["ADMIN"]), invoiceController.deleteInvoice);

module.exports=router;