const User = require('../models/User');

const getFriendRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userFriends = user.friends.map(friend => friend._id.toString());

    const recommendations = await User.find({ _id: { $ne: userId } })
      .populate('friends')
      .lean();

    const filteredRecommendations = recommendations.filter(potentialUser => {
      const potentialUserId = potentialUser._id.toString();
      return !userFriends.includes(potentialUserId);
    });

    const recommendedWithMutuals = filteredRecommendations.map(potentialUser => {
      const potentialUserFriends = potentialUser.friends.map(friend => friend._id.toString());
      const mutualFriends = userFriends.filter(friendId => potentialUserFriends.includes(friendId));
      return {
        user: potentialUser,
        mutualFriendsCount: mutualFriends.length,
        mutualFriends,
      };
    });

    const sortedRecommendations = recommendedWithMutuals.sort((a, b) => b.mutualFriendsCount - a.mutualFriendsCount);

    const newUser = {
      name: user.name,
      profile: user.profile,
      _id: user._id,
    };

    const formattedRecommendations = sortedRecommendations.map(item => ({
      name: item.user.name,
      profile: item.user.profile,
      _id: item.user._id,
    }));

    res.status(200).json(formattedRecommendations);
  } catch (error) {
    console.error('Error fetching friend recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
};

module.exports = { getFriendRecommendations };
