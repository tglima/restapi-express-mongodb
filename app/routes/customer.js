const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const jwtService = require('../services/jwt');

router.post('/save', jwtService.verifyJWT, customerController.saveCustomer);
router.get('/find/id=:id', jwtService.verifyJWT, customerController.findById);
router.get('/find/nuDocument=:nuDocument', jwtService.verifyJWT, customerController.findByNuDocument);
module.exports = router;