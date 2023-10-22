const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");

const dotEnv = require("dotenv").config();

module.exports.oneToOneChat = async function (req, res) {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId not sent with the request");
    return res.send(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name profileImage email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };
  }
  try {
    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).json(fullChat);
  } catch (error) {
    console.log(`Error in creating chat ${error}`);
    res.status(400).json({
      message: "Not created the chat ",
    });
  }
};
