const express = require('express');
const router = express.Router();

const authController = require('../Controllers/authController');

// Middleware
const isLoggedIn = authController.isAuthenticated;

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', isLoggedIn, authController.logout);





module.exports = router;