const express = require('express');
const router = express.Router();

const validators = require('../Utility/Validators');
const authController = require('../Controllers/authController');

const productController = require('../Controllers/productController');

const Television = require('../Models/Television');

// Middleware
const isLoggedIn = authController.isAuthenticated;
const validateForm = validators.validate_Television_Creation_Form;
const isOwner = authController.isOwner;



router.post('/create', isLoggedIn, validateForm, productController.create(Television));
router.delete('/:itemId/delete', isLoggedIn, isOwner(Television), productController.delete(Television));
router.put('/:itemId/update', isLoggedIn, validateForm, isOwner(Television), productController.update(Television));
router.get('/:itemId', productController.findById(Television));
router.get('/', productController.getCategory(Television));




module.exports = router;