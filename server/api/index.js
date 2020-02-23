const apiRouter = require("express").Router();

// API ROUTES
apiRouter.use("/testRoute", require("./testRoute"));

// API catch and let pass
apiRouter.use((req, res, next) => {
  const err = new Error("API route not found");
  console.error(err);
  err.status = 404;
  next(err);
});

module.exports = apiRouter;
