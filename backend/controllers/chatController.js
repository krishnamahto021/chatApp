const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");

const dotEnv = require("dotenv").config();

module.exports.oneToOneChat = async function (req, res) {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId not sent with the request");
    return res.status(400).json({
      message: "Internal Server Error!",
    });
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
    // If an existing chat is found, send the existing chat as the response
    return res.status(200).json(isChat[0]);
  } else {
    // If no chat is found, create a new chat and send it as the response
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return res.status(200).json(fullChat);
    } catch (error) {
      console.log(`Error in creating chat ${error}`);
      return res.status(400).json("Not created the chat ");
    }
  }
};

module.exports.fetchChat = async function (req, res) {
  try {
    var chats = await Chat.find({ users: { $elemMatch: { $eq: req.user } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 }); // to sort the latest chat first
    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name profileImage email",
    });
    res.send(chats);
  } catch (error) {
    console.log(`Error in fetching the chat ${error}`);
  }
};

module.exports.createGroupChat = async function (req, res) {
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).send("Need more than 2 memebers to create group");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    console.log(`Error in creating group chat ${error}`);
    return res.status(400).send(`Internal Server Error !`);
  }
};

module.exports.renameChatGroup = async function (req, res) {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password"); // new true helps to get the updated value

    if (!updatedChat) {
      return res.status(400).send("Chat not Updated!");
    } else {
      return res.status(200).send(updatedChat);
    }
  } catch (err) {
    console.log("errror in updating the name of group chat ");
    return res.status(400).send("Internal Server Error!");
  }
};

module.exports.addUser = async function (req, res) {
  try {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      console.log("Error in adding the users in the chat");
      return res.send(400).send("Internal Server Error");
    } else {
      return res.status(200).send(updatedChat);
    }
  } catch (error) {
    console.log(`Error in adding the users ${error}`);
    return res.status(400).send("Internal SErver error!!");
  }
};

module.exports.removeUser = async function (req, res) {
  try {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      console.log("Error in adding the users in the chat");
      return res.send(400).send("Internal Server Error");
    } else {
      return res.status(200).send(updatedChat);
    }
  } catch (error) {
    console.log(`Error in adding the users ${error}`);
    return res.status(400).send("Internal SErver error!!");
  }
};
