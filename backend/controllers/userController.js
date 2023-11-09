const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const bcrypt = require("bcrypt");
const { verifyUserEmailMailer } = require("../mailers/verifyUserEmailMailer");
dotEnv.config();
const crypto = require("crypto");
const { resetPasswordEmail } = require("../mailers/resetPasswordMailer");

module.exports.signUp = async function (req, res) {
  try {
    const { name, email, password, profileImage } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      console.log("user already exists");
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        token: user.token,
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
        profileImage,
        token: crypto.randomBytes(16).toString("hex"),
      });
      // console.log(newUser);
      verifyUserEmailMailer(newUser);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImage: newUser.profileImage,
        token: newUser.token,
      });
    }
  } catch (err) {
    console.log(`errror in creating user ${err}`);
  }
};

module.exports.verifyUser = async function (req, res) {
  try {
    const token = req.params.token;
    const user = await User.findOne({ token });
    if (!user) {
      console.log("not found");
      return res.status(400).json("Token Not valid");
    } else {
      user.isVerified = true;
      await user.save();
      return res.status(200).json({
        message: "Email verified successfully",
      });
    }
  } catch (error) {
    console.log(`Error in verifying user ${error}`);
    return res.status(500).json({
      message: "Internal Server Error !",
    });
  }
};

module.exports.signIn = async function (req, res) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      const isPasswordMatch = bcrypt.compare(password, user.password);
      if (isPasswordMatch && user.isVerified) {
        // Sign In Success
        console.log("sucess");
        let userWithOutPassword = {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          token: jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
          }),
        };
        return res.status(200).json({
          message: "Sign In successful",
          data: {
            user: userWithOutPassword,
          },
        });
      } else if (!user.isVerified) {
        console.log("Email not verified");
        return res.status(201).json({
          message: "Email not verified",
        });
      } else {
        // Invalid Password
        console.log("wrong password");
        return res.status(202).json({
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
    console.log(`error in signing in the user from the JWT ${err}`);
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};

module.exports.forgottenPassword = async function (req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(202).json({
        message: "User not registered",
      });
    } else if (user && user.isVerified) {
      resetPasswordEmail(user);
      return res.status(200).json({
        message: "Reset Password Link Sent",
      });
    } else if (!user.isVerified) {
      return res.status(201).json({
        message: "Please verify your Email",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Serever Error",
    });
  }
};

module.exports.resetPassword = async function (req, res) {
  try {
    const { email, password } = req.body;
    const token = req.params.token;
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(201).json({
        message: "Token not Valid",
      });
    } else {
      if (user.email === email) {
        user.password = password;
        await user.save();
        return res.status(200).json({
          message: "Password updated successfully",
        });
      } else {
        return res.status(202).json({
          message: "Email Not registered",
        });
      }
    }
  } catch (error) {
    console.log(`Error in reseting password ${error}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// /user/search-user/?search?=name
module.exports.searchUser = async function (req, res) {
  console.log(req.user);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).select("-password");
  res.send(users);
};

const tokenBlacklist = new Set(); // Initialize a Set to store blacklisted tokens

module.exports.logOut = function (req, res) {
  const token = req.user.token;
  if (token) {
    // Add the token to the blacklist
    tokenBlacklist.add(token);
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "Token not provided" });
  }
};

module.exports.googleSignUp = function (req, res) {
  const { _id, name, email, profileImage ,token} = req.user;
  const userData = {
    id:_id,
    name,
    email,
    profileImage,
    token
  };
  const queryParams = new URLSearchParams(userData).toString();

  // Redirect to the frontend route with query parameters
  res.redirect(`http://localhost:3000/user/auth/googleCallback?${queryParams}`);
};
