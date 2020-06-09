
const express = require('express');
const router = express.Router();

const validators = require('../Utility/Validators');
const authController = require('../Controllers/authController');
const productController = require('../Controllers/productController');

const Headphones = require('../Models/Headphones');

// Middleware
const validateFiles = validators.validate_Files;
const isLoggedIn = authController.isAuthenticated;
const validateForm = validators.validate_Headphones_Creation_Form;
const isOwner = authController.isOwner;



router.post('/create', isLoggedIn, validateFiles, validateForm, productController.create(Headphones));
router.put('/:itemId/update', isLoggedIn, isOwner(Headphones), validateFiles, validateForm, productController.update(Headphones));
router.delete('/:itemId/delete', isLoggedIn, isOwner(Headphones), productController.delete(Headphones));
router.get('/:itemId', productController.findById(Headphones));
router.get('/', productController.getCategory(Headphones));





module.exports = router;
