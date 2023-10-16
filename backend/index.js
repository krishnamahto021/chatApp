const express = require("express");
const dotEnv = require("dotenv");
const { chats } = require("./data");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const app = express();
dotEnv.config();

connectDB();

app.use(express.json());

app.use(express.urlencoded());
app.use(cookieParser());

app.use(
  session({
    name: "chatApp",
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  return res.send(chats);
});

// app.use('/user/sign-up',require('./routes'));
app.use("/user", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on the port ${PORT}`));
