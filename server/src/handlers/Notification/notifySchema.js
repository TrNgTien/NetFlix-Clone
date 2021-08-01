const mongoose = require('mongoose');

const notify = new mongoose.Schema({
    content:{
        type: String,
    },
    thumbnailURL:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {
    collection: 'notifications'
});
module.exports = Notify = mongoose.model('notifications', notify);
