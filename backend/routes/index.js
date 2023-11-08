const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");
const messageController = require("../controllers/messageController");
const passport = require("passport");

router.post("/sign-up", userController.signUp);

router.get("/verify-user/:token", userController.verifyUser);

router.post("/sign-in", userController.signIn);

router.post("/forgotten-password", userController.forgottenPassword); // sending mail to the registered user

router.post("/reset-password/:token", userController.resetPassword); // to update the password of the registered user

// router.get("/log-out", userController.logOut);
router.get("/search-user", userController.searchUser);
router.post(
  "/chat",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  chatController.oneToOneChat
);

router.get(
  "/chat",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  chatController.fetchChat
);

router.post(
  "/create-group-chat",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  chatController.createGroupChat
);

router.post(
  "/rename-group-chat",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  chatController.renameChatGroup
);

router.post(
  "/add-user-group-chat",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  chatController.addUsers
);

router.post(
  "/remove-user-group-chat",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  chatController.removeUser
);

router.post(
  "/chat/message",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  messageController.sendMessage
);

router.get(
  "/chat/message/:chatId",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  messageController.fetchAllMessages
);

module.exports = router;
