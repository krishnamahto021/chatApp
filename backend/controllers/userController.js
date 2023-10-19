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
      res.status(400);
    } else {
      const newUser = await User.create({ name, email, password, profilePic });
      console.log(newUser);
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
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.password === req.body.password) {
        return res.json(422, {
          message: "Sign In successfull",
          data: {
            token: jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
              expiresIn: "30d",
            }),
          },
        });
      } else {
        return res.json(422, {
          message: "Invalid Password",
        });
      }
    } else {
      return res.json(422, {
        message: "Invalid User",
      });
    }
  } catch (err) {
    console.log(`errror in signing up the user from the JWT ${err}`);
    return res.json(500, {
      message: "Internal Server Errror!!",
    });
  }
};
