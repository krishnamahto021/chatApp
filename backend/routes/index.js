const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.post("/sign-up", userController.signUp);
router.get(
  "/sign-in",
  userController.signIn
);

module.exports = router;
