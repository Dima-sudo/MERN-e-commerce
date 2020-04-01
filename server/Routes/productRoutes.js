const express = require('express');
const router = express.Router();

const productController = require('../Controllers/productController');


// Get all products with no filters
router.get('/', productController.getProducts);




module.exports = router;