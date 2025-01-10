const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/:receiverId", protect, createMessage);
router.get("/:receiverId", protect, getMessages);

module.exports = router;
