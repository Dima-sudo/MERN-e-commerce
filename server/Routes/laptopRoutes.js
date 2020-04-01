const express = require('express');
const router = express.Router();

const laptopController = require('../Controllers/laptopController');
const validators = require('../Utility/Validators');
const authController = require('../Controllers/authController');

// Middleware
const isLoggedIn = authController.isAuthenticated;
const validateForm = validators.validate_Laptop_Creation_Form;
const checkOwnership = laptopController.check_Laptop_Ownership;



router.post('/create', isLoggedIn, validateForm, laptopController.createLaptop);
router.post('/:laptopId/update', isLoggedIn, checkOwnership, validateForm, laptopController.updateLaptop);
router.get('/:laptopId/delete', isLoggedIn, checkOwnership, laptopController.deleteLaptop);
router.get('/:laptopId', laptopController.findById);
router.get('/', laptopController.getLaptops);





module.exports = router;