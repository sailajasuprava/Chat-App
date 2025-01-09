const express = require("express");
const { protect } = require("../controllers/authController");
const { getUsersForSidebar } = require("../controllers/userController");

const router = express.Router();

router.get("/", protect, getUsersForSidebar);

module.exports = router;
