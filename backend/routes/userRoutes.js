const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateUsername,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.put("/:id/username", updateUsername);

module.exports = router;
