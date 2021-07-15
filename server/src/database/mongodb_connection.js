const mongoose = require("mongoose");

const URI = "mongodb+srv://studytechstack:studytechstack@cluster0.h63ex.mongodb.net/netflix_clone"
            

const connectDb = async() =>{
    try{
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("connect successfully");
    }
    catch (err){
        console.log(err);
        process.exit(1);
    } 
}

module.exports = connectDb;