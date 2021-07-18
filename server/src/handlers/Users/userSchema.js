const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userName:{
        type: String
    },
    photoData:{
        type: String
    },
    fId: {
        type: String
    },
    gId: {
        type: String
    }
}, {
    collection: 'User'
}
)

module.exports = User = mongoose.model('User', user);