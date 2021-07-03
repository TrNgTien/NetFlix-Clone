const userRouter = require("./usersRoutes");

function routes(app){
    app.use("/UserForm", userRouter);
}

module.exports = routes;
