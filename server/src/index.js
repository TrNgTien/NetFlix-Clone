const express = require("express");
const connectMongoDB = require("./database/mongodb_connection"); 
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const routes = require("./routes/index");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const connectSocket = require('./notification/notifySocket');
require("dotenv").config();

connectMongoDB();
app.use(cors());
app.use(express.json());
routes(app);
connectSocket(io);

http.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});

module.exports = app;