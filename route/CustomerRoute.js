const express =require('express');
const CustomerController = require('../controller/customerController');
const verifyToken = require('../middleware/AuthMiddleware');
const router =express.Router();

router.post('/save-customer',verifyToken,CustomerController.saveCustomer);
router.put('/update-customer',verifyToken,CustomerController.updateCustomer);
router.delete('/delete-customer',verifyToken,CustomerController.deleteCustomer);
router.get('/find-customer',verifyToken,CustomerController.findCustomer);
router.get('/all-customer',verifyToken ,CustomerController.findAllCustomer);

module.exports=router;
