const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "This field is required!"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "This field is required!"],
      unique: true,
    },
    gender: {
      type: String,
      required: [true, "This field is required!"],
      enum: ["male", "female"],
    },
    password: {
      type: String,
      required: [true, "This field is required!"],
      minlength: [8, "Password must have atleast 8 characters."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "This field is required!"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  // eslint-disable-next-line prettier/prettier
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
