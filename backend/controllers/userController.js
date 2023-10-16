const User = require("../models/userSchema");

module.exports.signUp = async function (req, res) {
  try {
    const { name, email, password, pic } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      console.log("user already exists");
      return res.redirect("back");
    } else {
      const newUser = await User.create({ name, email, password, pic });
      console.log(newUser);
    }
  } catch (err) {
    console.log(`errror in creating user ${err}`);
  }
};

module.exports.signIn = async function (req, res) {
  console.log("signed in done!");
};
