const express = require('express');
const router = express.Router();
const defaultRoutes = require('./default');
const contactMessageRoutes = require('./contact-message');
const customerRoutes = require('./customer');
const productRoutes = require('./product');
const orderRoutes = require('./order');
const jwtRoutes = require('./jwt');

router.use('', jwtRoutes);
router.use('/customer', customerRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/contact', contactMessageRoutes);
router.use('**', defaultRoutes);
module.exports = router;
