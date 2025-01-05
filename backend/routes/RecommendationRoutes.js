const express = require('express');
const { getFriendRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getFriendRecommendations);

module.exports = router;
