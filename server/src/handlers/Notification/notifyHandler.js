const Notify = require('./notifySchema');
const mongoose = require('mongoose');


module.exports = {
    postNotification: async (req, res) => {
        const {content, thumbnailURL} = req.body;
        
        let model = new Notify(
            {
                content,
                thumbnailURL
            }
        );
        await model.save();
        res.json({
            message: "Push successfully",
            
        })
    },
    getLiveNotification: (req, res) => {
        const connection = mongoose.connection;

        connection.once("open", () => {
        console.log("MongoDB database connected");
        
        const ChangeStream = connection.collection("notifications").watch();
        ChangeStream.on("change", (change) => {
            switch (change.operationType) {
            case "insert":
                const notify = {
                    _id: change.fullDocument._id,
                    content: change.fullDocument.content,
                    thumbnailURL: change.fullDocument.thumbnailURL,
                    createdAt: change.fullDocument.createdAt
                };
                
                res.json({
                    data: notify
                })
                break;
            case "delete":
                
                break;
            }
        });
        });
    },
    getNotification: (req, res) => {
        notifications = Notify.find( {} )
        .then(data => {
            res.json({
                data: data
            })
        })
        .catch(err => {
            res.json({
                err: err
            })
        });
        
    }
}