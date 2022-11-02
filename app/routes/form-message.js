const express = require('express');
const router = express.Router();
const formMessageController = require('../controllers/form-message');

router.post('', formMessageController.save);
module.exports = router;