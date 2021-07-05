const http = require('http');
const express = require('express');
const socketio = require('socket.io');
// const cors = require("cors")

const app = express();

// app.use(cors())

const server = http.createServer(app);
const io = socketio(server);

app.get('/', function (req, res) {
    res.send('hello world')
  })

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');
 });
 
 const PORT = 3000 || process.env.PORT;
 
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));