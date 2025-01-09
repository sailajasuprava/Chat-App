const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appArror");

const generateAndSendToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("jwt", token, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

const signUp = async (req, res, next) => {
  try {
    const { fullname, username, gender, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      fullname,
      username,
      gender,
      password,
      passwordConfirm,
    });

    generateAndSendToken(res, newUser._id);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new AppError("Please provide username and password.", 400));
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect  username or password.", 401));
    }

    generateAndSendToken(res, user._id);

    res.status(200).json({
      status: "success",
      message: "login successful",
    });
  } catch (err) {
    next(err);
  }
};

const protect = async (req, res, next) => {
  try {
    const { jwt: token } = req.cookies;

    if (!token) {
      return next(new AppError("You are not logged in"), 401);
    }

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (!payload.id) {
      return next(new AppError("Invalid token."), 401);
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return next(new AppError("User doesn't exist."), 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not allowed", 403));
    }
    next();
  };

module.exports = { signUp, logIn, protect, restrictTo };
