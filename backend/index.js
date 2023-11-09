const express = require("express");
const dotEnv = require("dotenv");
const { chats } = require("./data");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");
const passport = require("passport");
// const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const { chatSockets } = require("./config/chatSockets");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const passportGoogle = require("./config/passport-google-strategy");

const app = express();
dotEnv.config();

connectDB();

app.use(express.json());

app.use(
  session({
    name: "chatApp",
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 80 * 60,
    },
    store: new MongoStore(
      {
        mongoUrl: process.env.MONGO_URI,
      },
      {
        mongooseConnection: connectDB,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || `successfully added mongostore `);
      }
    ),
  })
);

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

// set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/user", require("./routes"));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running on the port ${PORT}`)
);

chatSockets(server);
