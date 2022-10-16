const express = require('express');
const router = express.Router();
const jwtController = require('../controllers/jwt');

router.post('/auth', jwtController.auth);
module.exports = router;