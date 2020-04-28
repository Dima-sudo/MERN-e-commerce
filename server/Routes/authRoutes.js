const express = require('express');
const router = express.Router();

const authController = require('../Controllers/authController');
const validators = require('../Utility/Validators');

// Middleware
const isLoggedIn = authController.isAuthenticated;
const validateSignup = validators.validate_Account_Creation_Form;

router.post('/signup', validateSignup, authController.signUp);
router.post('/login', authController.login);
router.get('/logout', isLoggedIn, authController.logout);





module.exports = router;