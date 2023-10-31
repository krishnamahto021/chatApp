const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");
const passport = require("passport");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);

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

module.exports = router;
