// // server.js
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const shortid = require('shortid');
// const cors = require('cors');
//
// const app = express();
// app.use(cors()); // Umożliwia CORS
//
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: '*', // Ustaw odpowiednio do swoich potrzeb
//     methods: ['GET', 'POST'],
//   },
// });
//
// const PORT = process.env.PORT || 5000;
//
// server.listen(PORT, () => {
//   console.log(`Serwer nasłuchuje na porcie ${PORT}`);
// });
