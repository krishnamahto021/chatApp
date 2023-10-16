const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email });
        if (user) {
          if (user.password === password) {
            console.log("User signed in  successfuly!!");
            return done(null, user);
          } else {
            console.log("Wrong Password!!");
            return done(null, false);
          }
        } else {
          console.log(`not found the user`);
          return done(null, false);
        }
      } catch (err) {
        console.log(`error in siginig up the user`);
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = User.findById(id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
