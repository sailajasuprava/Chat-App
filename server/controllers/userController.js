const User = require("../models/userModel");

const getUsersForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json({
      status: "success",
      results: filteredUsers.length,
      data: filteredUsers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsersForSidebar };
