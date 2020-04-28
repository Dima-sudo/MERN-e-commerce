const express = require('express');
const router = express.Router();

const validators = require('../Utility/Validators');
const authController = require('../Controllers/authController');
const productController = require('../Controllers/productController');

const Laptop = require('../Models/Laptop');

// Middleware
const validateFiles = validators.validate_Files;
const isLoggedIn = authController.isAuthenticated;
const validateForm = validators.validate_Laptop_Creation_Form;
const isOwner = authController.isOwner;



router.post('/create', isLoggedIn, validateFiles, validateForm, productController.create(Laptop));
router.put('/:itemId/update', isLoggedIn, isOwner(Laptop), validateFiles, validateForm, productController.update(Laptop));
router.delete('/:itemId/delete', isLoggedIn, isOwner(Laptop), productController.delete(Laptop));
router.get('/:itemId', productController.findById(Laptop));
router.get('/', productController.getCategory(Laptop));





module.exports = router;