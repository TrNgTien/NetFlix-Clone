const mongoose = require("mongoose");

const URI = "mongodb+srv://Netflix-notification:netflixnotification@cluster0.cubhx.mongodb.net/test"

const connectDb = async() =>{
    try{
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connect successfully");
    }
    catch (err){
        console.log("Connect failure");
    } 
}

module.exports = connectDb;