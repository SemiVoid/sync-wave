require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let hostControllerID = '';
let currentTime = 0;
let currentVideo = 'c-P-6EgY6II';

const linkRegex = new RegExp(
  '(?:https?://)?(?:www.)?youtu(?:.be/|be.com/S*(?:watch|embed)(?:(?:(?=/[^&s?]+(?!S))/)|(?:S*v=|v/)))([^&s?]+)'
);

io.on('connection', (socket) => {
  console.log(`User with id ${socket.id} connected`);
  hostControllerID = socket.client.id;

  io.to(socket.client.id).emit('change', currentVideo);

  socket.on('globalPlay', () => {
    io.sockets.emit('play');
  });
  socket.on('globalPause', () => {
    io.sockets.emit('pause');
  });
  socket.on('globalVideoChange', (data) => {
    if (linkRegex.test(data)) {
      let cutLink = linkRegex.exec(data)[1];
      currentVideo = cutLink;
      currentTime = 0;
      io.sockets.emit('change', currentVideo);
    }
  });
  socket.on('globalTimeRefresh', () => {
    io.to(socket.client.id).emit('videoTimeRefresh', currentTime);
  });
  socket.on('globalTimeChange', (data) => {
    if (hostControllerID === socket.client.id) {
      currentTime = data;
    }
  });
  socket.on('outOfSync', () => {
    io.sockets.emit('pause');
    io.sockets.emit('resyncClient', currentTime);
    setTimeout(() => {
      io.sockets.emit('play');
    }, 500);
  });
});

const roomRouter = require('./routes/room');
app.use('/room', roomRouter);

const queueRouter = require('./routes/queue');
app.use('/queue', queueRouter);

server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log('Server Started');
});
