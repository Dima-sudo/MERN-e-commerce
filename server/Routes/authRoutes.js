const express = require('express');
const router = express.Router();

const authController = require('../Controllers/authController');
const validators = require('../Utility/Validators');

// Middleware
const isLoggedIn = authController.isAuthenticated;
const validateSignup = validators.validate_Account_Creation_Form;


router.patch('/changePassword', isLoggedIn, authController.changePassword);
router.delete('/deactivate', isLoggedIn, authController.deactivate);
router.post('/signup', validateSignup, authController.signUp);
router.post('/login', authController.login);
router.get('/logout', isLoggedIn, authController.logout);





module.exports = router;