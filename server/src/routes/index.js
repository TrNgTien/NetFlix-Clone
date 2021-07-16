const userRouter = require("./usersRoutes");
const moviesRouter = require("./moviesRoutes")
const post = require("./postmovie");

function routes(app){
    app.use("/UserForm", userRouter);
    app.use("/Movies", moviesRouter);
}

module.exports = routes;
