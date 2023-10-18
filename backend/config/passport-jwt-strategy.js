const passport = require("passport");
const User = require("../models/userSchema");
const dotenv = require("dotenv").config();
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    console.log("hi");
    try {
      const user = User.findOne({ email: req.body.email });
      if (user) {
        if (user.password === req.body.password) {
          console.log(`user found!`);
          return done(null, user);
        } else {
          console.log(`password unmatched!`);
          return done(null, false);
        }
      }
    } catch (err) {
      console.log(`error in jwt authentication ${err}`);
      return done(err);
    }
  })
);

module.exports = passport;
