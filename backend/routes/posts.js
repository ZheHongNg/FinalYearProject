const express = require("express");

const {
    getFeedPosts,
    getUserPosts,
    likePost,
} = require("../controllers/posts.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts",  getUserPosts);

/* UPDATE */
router.patch("/:id/like",  likePost);

module.exports =  router;
