module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    pingTimeOut: 60000,
    cors: {
      origin: "https://chatapp-inyr.onrender.com/",
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

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping"));

    socket.on("newMessage", (newMessageRec) => {
      var chat = newMessageRec.chat;
      if (!chat.users) {
        console.log(`chat users not defined`);
        return;
      }
      // to braodcast to all the users of the room expect the sender
      io.to(chat._id).emit("messageRecieved", newMessageRec);
    });

    socket.on("disconnect", function () {
      console.log("Socket disconnected");
    });
  });
};
