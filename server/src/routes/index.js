const userRouter = require("./usersRoutes");
const moviesRouter = require("./moviesRoutes")

function routes(app){
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
    app.use("/UserForm", userRouter);
    app.use("/Movies", moviesRouter);
}

module.exports = routes;
