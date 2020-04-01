const express = require('express');
const router = express.Router();

const postsController = require('../Controllers/postsController');
const authController = require('../Controllers/authController');

// Middleware
const isLoggedIn = authController.isAuthenticated;


router.put('/:postId/update', postsController.updatePost);
router.delete('/:postId/delete', postsController.deletePost);
router.get('/:postId', postsController.findById);
router.post('/create', postsController.createPost);
router.get('/', isLoggedIn, postsController.getPosts);







module.exports = router;