const express = require('express');
const router = express.Router();
const contactMessageController = require('../controllers/contact-message');

router.post('', contactMessageController.save);
module.exports = router;