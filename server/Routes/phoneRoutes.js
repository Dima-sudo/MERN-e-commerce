
const express = require('express');
const router = express.Router();

const validators = require('../Utility/Validators');
const authController = require('../Controllers/authController');
const productController = require('../Controllers/productController');

const Phone = require('../Models/Phone');

// Middleware
const validateFiles = validators.validate_Files;
const isLoggedIn = authController.isAuthenticated;
const validateForm = validators.validate_Phone_Creation_Form;
const isOwner = authController.isOwner;



router.post('/create', isLoggedIn, validateFiles, validateForm, productController.create(Phone));
router.put('/:itemId/update', isLoggedIn, isOwner(Phone), validateFiles, validateForm, productController.update(Phone));
router.delete('/:itemId/delete', isLoggedIn, isOwner(Phone), productController.delete(Phone));
router.get('/:itemId', productController.findById(Phone));
router.get('/', productController.getCategory(Phone));





module.exports = router;
