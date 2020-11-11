require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);

const roomRouter = require('./routes/room');
app.use('/room', roomRouter);

const queueRouter = require('./routes/queue');
app.use('/queue', queueRouter);

http.listen(process.env.SERVER_PORT || 5000, () => {
  console.log('Server Started');
});