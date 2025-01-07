const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "This field is required!"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "This field is required!"],
    },
    message: {
      type: String,
      required: [true, "This field is required!"],
    },
  },
  // eslint-disable-next-line prettier/prettier
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
