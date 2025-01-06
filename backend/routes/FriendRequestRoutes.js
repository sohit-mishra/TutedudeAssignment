const express = require('express');
const { 
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriendList, 
  getRequestFriendList,
} = require('../controllers/FriendRequestController'); 
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/send', protect, sendFriendRequest);
router.post('/accept', protect, acceptFriendRequest);  
router.post('/reject', protect, rejectFriendRequest);
router.get('/requests', protect, getFriendRequests); 
router.get('/friends', protect, getFriendList); 

module.exports = router;