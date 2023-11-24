const Post = require("../models/Post");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

/* CREATE */
const createPost = asyncHandler(async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newPost = new Post({
      userId,
      name: user.name,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      isSuspended: false,
    });
    await newPost.save();
 
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
 });
 

/* READ */
const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/* UPDATE */
const likePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = { createPost, getFeedPosts, getUserPosts, likePost };
