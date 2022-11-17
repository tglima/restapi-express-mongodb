const express = require('express');
const router = express.Router();
const contactMessageController = require('../controllers/contact-message');
const jwtService = require('../services/jwt');

router.post('', jwtService.verifyJWT, contactMessageController.save);
module.exports = router;