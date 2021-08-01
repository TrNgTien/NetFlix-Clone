const userRouter = require("./usersRoutes");
const moviesRouter = require("./moviesRoutes");
const notifyRouter = require("./notifyRoutes");


function routes(app){
    app.use("/UserForm", userRouter);
    app.use("/Movies", moviesRouter);
    app.use("/Notification", notifyRouter);
    
}

module.exports = routes;
