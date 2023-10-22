const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.get(
  "/chat",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  userController.chatApi
);

router.get("/log-out/:token", userController.logOut);
router.get("/search-user",userController.searchUser);

module.exports = router;
