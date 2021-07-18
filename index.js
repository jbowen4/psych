const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ['http://localhost:3006']
  }
});

// Run when client connects
io.on('connection', socket => {

    socket.on("makeRoom", ({username, room}) => {
      // Create new user
      const user = userJoin(socket.id, username, room);

      // Join
      socket.join(room)

      // Emit to user entered new room successfully
      socket.emit("joinSuccess")

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    })

    socket.on("joinRoom", ({username, room}) => {
      // Create new user
      const user = userJoin(socket.id, username, room);

      var room = io.sockets.adapter.rooms[room]

      // Check if room does not exist
      if (room === undefined) {
        socket.emit('joinFailure');
        return
      }

      // Join
      socket.join(roomId)
      
      // Emit to user entered new room successfully
      socket.emit("joinSuccess")
      
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    })
 });
 
 const PORT = 3000 || process.env.PORT;
 
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));