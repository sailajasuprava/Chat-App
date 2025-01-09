const express = require("express");
const { signUp, logIn, logOut } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

module.exports = router;
