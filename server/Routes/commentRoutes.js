const express = require('express');
const router = express.Router();

const commentController = require('../Controllers/commentController');
const authController = require('../Controllers/authController');
const validators = require('../Utility/Validators');

const Comment = require('../Models/Comment');

// Middleware
const isLoggedIn = authController.isAuthenticated;
const validateForm = validators.validate_Laptop_Creation_Form;
const isOwner = authController.isOwner;

// #TODO Add comment ownership to isOwner

router.post('/:itemId/create', isLoggedIn, commentController.create);
router.delete('/:itemId/:commentId/delete', isLoggedIn, isOwner(Comment), commentController.delete);
router.put('/:itemId/:commentId/update', isLoggedIn, isOwner(Comment), commentController.update);
router.get('/:commentId', commentController.findById);



module.exports = router;