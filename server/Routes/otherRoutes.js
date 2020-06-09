const express = require('express');
const router = express.Router();

const validators = require('../Utility/Validators');
const authController = require('../Controllers/authController');
const productController = require('../Controllers/productController');

const Other = require('../Models/Other');

// Middleware
const validateFiles = validators.validate_Files;
const isLoggedIn = authController.isAuthenticated;
const validateForm = validators.validate_Other_Creation_Form;
const isOwner = authController.isOwner;



router.post('/create', isLoggedIn, validateFiles, validateForm, productController.create(Other));
router.put('/:itemId/update', isLoggedIn, isOwner(Other), validateFiles, validateForm, productController.update(Other));
router.delete('/:itemId/delete', isLoggedIn, isOwner(Other), productController.delete(Other));
router.get('/:itemId', productController.findById(Other));
router.get('/', productController.getCategory(Other));





module.exports = router;