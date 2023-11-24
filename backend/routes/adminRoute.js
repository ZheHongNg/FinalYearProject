const express = require("express");

const {
    suspendPost, 
    suspendUser, 
    getAllUsers, 
    getAllPosts
} = require("../controllers/adminController.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* READ */
router.route("/getUsers").get(getAllUsers);
router.route("/getPosts").get(getAllPosts);

/* UPDATE */
router.post("/:id/suspendUser",  suspendUser);
router.post("/:id/suspendPost",  suspendPost);

module.exports =  router;