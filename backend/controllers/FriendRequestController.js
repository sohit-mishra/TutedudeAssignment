const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.body.receiverId;

    if (senderId === receiverId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: "A request already exists between these users" });
    }

    const friendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
      status: 'pending'
    });

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    receiver.friendRequests.push(friendRequest._id);
    await receiver.save();

    await friendRequest.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending friend request' });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.body.requestId;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.receiver.toString() !== userId) {
      return res.status(400).json({ message: "You are not the receiver of this request" });
    }

    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ message: "This request has already been processed" });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    const sender = await User.findById(friendRequest.sender);
    const receiver = await User.findById(friendRequest.receiver);

    sender.friends.push(receiver._id);
    receiver.friends.push(sender._id);

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting friend request' });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.body.requestId;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.receiver.toString() !== userId) {
      return res.status(400).json({ message: "You are not the receiver of this request" });
    }

    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ message: "This request has already been processed" });
    }

    friendRequest.status = 'rejected';
    await friendRequest.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting friend request' });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const sentRequests = await FriendRequest.find({ sender: userId })
      .populate('receiver', 'name profile')
      .lean();

    const receivedRequests = await FriendRequest.find({ receiver: userId })
      .populate('sender', 'name profile')
      .lean();

    const allRequests = [...sentRequests, ...receivedRequests];

    const formattedRequests = allRequests.map(request => {
      const isSender = request.sender._id.toString() === userId;
      const userDetails = isSender ? request.receiver : request.sender;
      return {
        requestId: request._id,
        user: {
          _id: userDetails._id,
          name: userDetails.name,
          profile: userDetails.profile,
        },
        status: request.status,
        isSender,
      };
    });

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ message: 'Error fetching friend requests' });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
};
