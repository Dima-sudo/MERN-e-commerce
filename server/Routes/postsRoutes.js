const express = require('express');
const router = express.Router();

const postsController = require('../Controllers/postsController');


router.put('/:postId/update', postsController.updatePost);
router.delete('/:postId/delete', postsController.deletePost);
router.get('/:postId', postsController.findById);
router.post('/create', postsController.createPost);
router.get('/', postsController.getPosts);







module.exports = router;