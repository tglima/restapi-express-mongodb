const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

router.get('/find/id=:id', customerController.findById);
router.get('/find/nuDocument=:nuDocument', customerController.findByNuDocument);
module.exports = router;