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

app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'));

connectMongoDB();
app.use(cors());
app.use(express.json());
routes(app);
connectSocket(io);
// routes(app);

http.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});
// app.listen(PORT, () => {
//   console.log(` Server is running in ${PORT}`);
// });


module.exports = app;