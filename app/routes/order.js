const express = require('express');
const router = express.Router();
const jwtService = require('../services/jwt');
const orderController = require('../controllers/order');

router.post('/save', jwtService.verifyJWT, orderController.saveOrder);
router.get('/find/customer/nuDocument=:nuDocument', jwtService.verifyJWT, orderController.findByNuDocument);
router.get('/find/customer/idCustomer=:idCustomer', jwtService.verifyJWT, orderController.findByIdCustomer);
router.put('/update/id=:id', jwtService.verifyJWT, orderController.updateOrder);
router.delete('/delete/id=:id', jwtService.verifyJWT, orderController.cancelOrder);
module.exports = router;