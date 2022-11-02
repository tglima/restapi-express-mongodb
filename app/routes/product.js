const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/product/find', productController.findAll);
router.get('/product/find/id=:id', productController.findById);
router.post('/product', productController.saveNew);
module.exports = router;