const router = require('express').Router();
const invoiceController=require('../controllers/invoice');
const auth = require('../middleware/auth');

router.post('/:id', invoiceController.issueInvoice);

router.get('/:id', invoiceController.getInvoice);

router.get('/', invoiceController.getAllInvoices);

router.get('/user/:id', invoiceController.getAllUserInvoices);

router.delete('/:id', invoiceController.deleteInvoice);

module.exports=router;