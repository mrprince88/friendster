const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];
let map = {};

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const ifUserNotActive = (userId, sender, message) => {
  map[userId] = map[userId] || [];
  map[userId].push({ sender: sender, message: message, date: new Date() });
};

io.on("connection", (socket) => {
  socket.sendBuffer = [];
  socket.on("addUser", (userId) => {
    addNewUser(userId, socket.id);
    if (map[userId] && map[userId].length != 0) {
      io.to(socket.id).emit("getNotification", map[userId]);
      map[userId] = [];
    }
  });

  socket.on("sendNotification", ({ sender, receiverId, message }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      if (receiver.socketId !== socket.id) {
        io.to(receiver.socketId).emit("getNotification", {
          sender,
          message,
          date: new Date(),
        });
      }
    } else {
      ifUserNotActive(receiverId, sender, message);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);
