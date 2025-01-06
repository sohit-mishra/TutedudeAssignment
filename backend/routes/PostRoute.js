const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  getUserPosts,
} = require('../controllers/PostController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/user/:id', getUserPosts);

module.exports = router;
