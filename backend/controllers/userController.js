const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

module.exports.signUp = async function (req, res) {
  try {
    const { name, email, password, profilePic } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      console.log("user already exists");
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      const newUser = await User.create({ name, email, password, profilePic });
      // console.log(newUser);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (err) {
    console.log(`errror in creating user ${err}`);
  }
};

module.exports.signIn = async function (req, res) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        // Sign In Success
        console.log("sucess");
        return res.status(200).json({
          message: "Sign In successful",
          data: {
            token: jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
              expiresIn: "30d",
            }),
          },
        });
      } else {
        // Invalid Password
        console.log("wrong password");
        return res.status(201).json({
          message: "Invalid Password",
        });
      }
    } else {
      // Invalid User
      console.log("Wrong email");
      return res.status(202).json({
        message: "Invalid User",
      });
    }
  } catch (err) {
    console.log(`error in signing up the user from the JWT ${err}`);
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};

module.exports.chatApi = async function (req, res) {
  console.log("hi inside chat api");
};

const tokenBlacklist = new Set(); // Initialize a Set to store blacklisted tokens

module.exports.logOut = function (req, res) {
  const token = req.params.token;
  if (token) {
    // Add the token to the blacklist
    tokenBlacklist.add(token);
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "Token not provided" });
  }
};
