const mongoose = require('mongoose');

function connectSocket(io) {
    const connection = mongoose.connection;
    io.on('connection', (socket) => {
        console.log("user connected");
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        });
    
    connection.once("open", () => {
    console.log("MongoDB database connected");
    
    const ChangeStream = connection.collection("notifications").watch();
    ChangeStream.on("change", (change) => {
        switch (change.operationType) {
        case "insert":
            const movie = {
            _id: change.fullDocument._id,
            name: change.fullDocument.name,
            description: change.fullDocument.description,
            createdAt: change.fullDocument.createdAt
            };
            console.log("inside changeStream insert");
            io.emit('message', movie.name + movie.description + movie.createdAt);
            break;
        case "delete":
            io.emit("deleted", change.documentKey._id);
            break;
        }
    });
    });
}
module.exports = connectSocket;