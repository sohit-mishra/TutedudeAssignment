const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');


const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.body.receiverId;

    if (senderId === receiverId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    const receiverUser = await User.findById(receiverId);
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId, status: { $in: ['pending', 'accepted'] } },
        { sender: receiverId, receiver: senderId, status: { $in: ['pending', 'accepted'] } }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ message: "A request already exists between these users" });
    }

    const friendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
      status: 'pending'
    });

    await friendRequest.save();

    const senderUser = await User.findById(receiverId);
   
    senderUser.friendRequests.push(senderId); 

    await senderUser.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending friend request' });
  }
};


const acceptFriendRequest = async (req, res) => {
  try {
    const requestId = req.body.requestId;

    const friendRequest = await FriendRequest.findByIdAndUpdate(
      requestId,
      { status: 'accepted' },
      { new: true }
    );

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    const senderUser = await User.findById(friendRequest.sender);
    const receiverUser = await User.findById(friendRequest.receiver);

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    senderUser.friends.push(friendRequest.receiver);
    await senderUser.save();

    receiverUser.friends.push(friendRequest.sender);
    await receiverUser.save();

    await User.updateOne(
      { _id: receiverUser._id },
      { $pull: { friendRequests: friendRequest.sender } }
    );


    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting friend request' });
  }
};


const rejectFriendRequest = async (req, res) => {
  try {
    const requestId = req.body.requestId;

    if (!requestId) {
      return res.status(400).json({ message: 'Request ID is required' });
    }

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    const senderUser = await FriendRequest.findById(requestId);

    await User.updateOne(
      { _id: senderUser.receiver },
      { $pull: { friendRequests: friendRequest.sender } }
    );

    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting friend request' });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const friendRequests = await FriendRequest.find({ receiver: userId, status: 'pending' })
      .populate('sender', 'name email profile');

    if (!friendRequests) {
      return res.status(404).json({ message: 'No friend requests found' });
    }

    res.status(200).json(friendRequests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ message: 'Error fetching friend requests' });
  }
};

const getFriendList = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('friends', 'name email profile');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error('Error fetching friend list:', error);
    res.status(500).json({ message: 'Error fetching friend list' });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriendList
};
