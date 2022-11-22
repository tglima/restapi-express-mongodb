const express = require('express');
const homeController = require('../controllers/home');
const router = express.Router();

router.get('/', homeController.getHome);
router.post('/', homeController.getHome);
router.put('/', homeController.getHome);
router.delete('/', homeController.getHome);
module.exports = router;