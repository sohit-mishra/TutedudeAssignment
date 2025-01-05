const Post = require('../models/Post');
const User = require('../models/User');


const createPost = async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;
    const userId = req.user.id;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
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
    res.status(500).json({ message: 'Error creating post' });
  }
};


const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: 'Post liked', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error liking post' });
  }
};


const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have not liked this post yet' });
    }

    post.likes = post.likes.filter(like => like.toString() !== userId);
    await post.save();

    res.status(200).json({ message: 'Post unliked', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error unliking post' });
  }
};


const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    post.comments.push({ user: userId, comment });
    await post.save();

    res.status(200).json({ message: 'Comment added', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').populate('comments.user', 'username').sort({ createdAt: -1 });

    if (!posts) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};


const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate('user', 'username').populate('comments.user', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

module.exports = {
  createPost,
  likePost,
  unlikePost,
  commentOnPost,
  getAllPosts,
  getPostById,
};
