const express = require("express");

const {
    getFeedPosts,
    getUserPosts,
    likePost,
    deletePost
} = require("../controllers/posts.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts",  getUserPosts);

/* UPDATE */
router.patch("/:id/like",  likePost);

/* Delete */
router.patch("/:id/delete",  deletePost);

module.exports =  router;
