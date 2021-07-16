const mongoose = require('mongoose');

const movieNotify = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {
    collection: 'notifications'
});
module.exports = Notify = mongoose.model('notifications', movieNotify);
