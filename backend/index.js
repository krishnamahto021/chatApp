const express = require("express");
const dotEnv = require("dotenv");
const { chats } = require("./data");
const connectDB = require("./config/db");
const passport = require("passport");
// const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const { chatSockets } = require("./config/chatSockets");

const app = express();
dotEnv.config();

connectDB();

app.use(express.json());

app.use(express.urlencoded());

app.use(passport.initialize());

// app.use('/user/sign-up',require('./routes'));
app.use("/user", require("./routes"));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running on the port ${PORT}`)
);

chatSockets(server);
