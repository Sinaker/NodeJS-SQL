const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProducts);

router.get('/products', shopController.getProducts);
router.get('/products/:productID', shopController.getDetails);

router.get('/cart', shopController.getCart);
router.post('/cart/:productID', shopController.putCart); //Using params
router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

module.exports = router;
