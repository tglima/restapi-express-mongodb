const express = require('express');
const homeController = require('../controllers/home');
const router = express.Router();
const jwtService = require('../services/jwt');

router.get('/', jwtService.verifyJWT, homeController.getHome);
router.get('/public', homeController.getPublic);
module.exports = router;