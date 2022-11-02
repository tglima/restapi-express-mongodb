const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

router.get('/customer/find/id=:id', customerController.findById);
router.get('/customer/find/nuDocument=:nuDocument', customerController.findByNuDocument);
module.exports = router;