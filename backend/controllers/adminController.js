const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Post = require('../models/Post');
const asyncHandler = require("express-async-handler");

// Endpoint to get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({isAdmin:{$ne:true}});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get all posts
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  });
//update suspend Post
  const suspendPost = asyncHandler(async (req, res) => {
    const {isSuspend} = req.body;
    const { id } = req.params;
    const suspendPost = await Post.findByIdAndUpdate(
      id,
      { isSuspend: isSuspend },
      { new: true }
    );

    if (!suspendPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(suspendPost);
    
  });
//update suspend user
  const suspendUser = asyncHandler(async (req, res) => {
    const { isSuspend } = req.body;
    const { id } = req.params;

    const suspendedUser = await User.findByIdAndUpdate(
      id, 
      { isSuspend: isSuspend}, 
      { new: true }
      );
   
    if (!suspendedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    res.status(200).json(suspendedUser);
   });

  module.exports = {suspendPost, suspendUser, getAllUsers, getAllPosts };
