const express = require('express');
const { createPost,
    likePost,
    unlikePost,
    commentOnPost,
    getAllPosts,
    getPostById, } = require('../controllers/PostController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createPost);
router.put('/like/:id', protect, likePost);
router.put('/unlike/:id', protect, unlikePost);
router.post('/comment/:id', protect, commentOnPost);
router.get('/', protect, getAllPosts);
router.get('/:id', protect, getPostById);

module.exports = router;
