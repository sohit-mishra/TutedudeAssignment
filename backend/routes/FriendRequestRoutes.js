const express = require('express');
const { 
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests 
} = require('../controllers/friendRequestController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/send', protect, sendFriendRequest);
router.post('/accept/:id', protect, acceptFriendRequest);
router.post('/reject/:id', protect, rejectFriendRequest);
router.get('/requests', protect, getFriendRequests);

module.exports = router;
