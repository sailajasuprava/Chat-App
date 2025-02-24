const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId } = require("../utils/socket");
const { io } = require("../utils/socket");

const createMessage = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      });
    }

    const newMessage = new Message({
      message,
      senderId,
      receiverId,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    io.to(receiverSocketId).emit("send-message", newMessage);

    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    }).populate("messages");

    const messages = conversation?.messages || [];

    res.status(200).json({
      status: "success",
      message: "Message sent successfully",
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createMessage, getMessages };
