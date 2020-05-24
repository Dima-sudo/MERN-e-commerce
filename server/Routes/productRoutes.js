const express = require('express');
const router = express.Router();

const productController = require('../Controllers/productController');
const authController = require('../Controllers/authController');

// Middleware
const isLoggedIn = authController.isAuthenticated;

// Get all products with no filters
router.get('/search/:query', productController.query);
router.post('/:itemId/checkout', isLoggedIn, productController.checkout);
router.get('/getlistings', isLoggedIn, productController.getListings);
router.get('/', productController.getProducts);


module.exports = router;