const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const jwtService = require('../services/jwt');

router.get('/find', jwtService.verifyJWT, productController.findAll);
router.get('/find/id=:id', jwtService.verifyJWT, productController.findById);
module.exports = router;