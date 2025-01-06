const Post = require('../models/Post');
const User = require('../models/User');


const createPost = async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;
    const userId = req.user.id; 

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const newPost = new Post({
      user: userId,
      imageUrl,
      caption,
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username') 
      .sort({ createdAt: -1 }); 

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};


const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId)
      .populate('user', 'username'); 

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};


const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ user: userId })
      .populate('user', 'username') 
      .sort({ createdAt: -1 });  

    if (!posts || posts.length === 0) {
      return res.status(200).json({ message: 'No posts found for this user' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user posts', error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getUserPosts,
};
