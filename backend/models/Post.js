const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, 
  },
  caption: {
    type: String,
    trim: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
