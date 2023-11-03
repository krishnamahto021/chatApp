module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    pingTimeOut: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.sockets.on("connection", function (socket) {
    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected");
    });

    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log(`User joined the room ${room}`);
    });

    socket.on("newMessage", (newMessageRec) => {
      var chat = newMessageRec.chat;
      if (!chat.users) {
        console.log(`chat users not defined`);
        return;
      }
      console.log(newMessageRec);
      chat.users.forEach((user) => {
        if (user._id === newMessageRec.sender._id) {
          console.log("Same sender and reciver ");
          return;
        }
        // socket.in(user._id).emit("messageRecieved", newMessageRec);
        io.to(chat._id).emit("messageRecieved", newMessageRec);
      });
    });

    socket.on("disconnect", function () {
      console.log("Socket disconnected");
    });
  });
};
