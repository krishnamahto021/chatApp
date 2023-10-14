const express = require("express");
const dotEnv = require("dotenv");
const { chats } = require("./data");

const app = express();
dotEnv.config();

app.get("/", (req, res) => {
  return res.send(chats);
});

app.get("/api/chats", (req, res) => {
  return res.send(chats);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on the port ${PORT}`));
