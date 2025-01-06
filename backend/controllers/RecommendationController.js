const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

const getFriendRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userFriends = user.friends.map(friend => friend._id.toString());

    const recommendations = await User.find({ _id: { $ne: userId } })
      .populate('friends')
      .lean();

    const existingRequests = await FriendRequest.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).lean();

    const usersWithPendingOrAcceptedRequests = existingRequests.map(request => {
      return request.senderId.toString() === userId ? request.receiverId.toString() : request.senderId.toString();
    });

    const filteredRecommendations = recommendations.filter(potentialUser => {
      const potentialUserId = potentialUser._id.toString();
      return !userFriends.includes(potentialUserId) && !usersWithPendingOrAcceptedRequests.includes(potentialUserId);
    });

    const recommendedWithMutuals = filteredRecommendations.map(potentialUser => {
      const potentialUserFriends = potentialUser.friends.map(friend => friend._id.toString());
      const mutualFriends = userFriends.filter(friendId => potentialUserFriends.includes(friendId));
      return {
        user: potentialUser,
        mutualFriendsCount: mutualFriends.length,
        mutualFriends,
        existingRequestStatus: existingRequests.find(request => 
          (request.senderId.toString() === potentialUser._id.toString() || 
           request.receiverId.toString() === potentialUser._id.toString())
        )?.status || 'none',
      };
    });

    const sortedRecommendations = recommendedWithMutuals.sort((a, b) => b.mutualFriendsCount - a.mutualFriendsCount);

    const formattedRecommendations = sortedRecommendations.map(item => ({
      name: item.user.name,
      profile: item.user.profile,
      _id: item.user._id,
      mutualFriendsCount: item.mutualFriendsCount,
      mutualFriends: item.mutualFriends,
      existingRequestStatus: item.existingRequestStatus,
    }));

    res.status(200).json(formattedRecommendations);
  } catch (error) {
    console.error('Error fetching friend recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
};

module.exports = { getFriendRecommendations };
