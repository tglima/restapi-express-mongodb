const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/find', productController.findAll);
router.get('/find/id=:id', productController.findById);
router.post('', productController.saveNew);
module.exports = router;