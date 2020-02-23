const testRouteRouter = require("express").Router();

testRouteRouter.get("/", (req, res, next) => {
  res.send("You are hitting the test API route");
});

module.exports = testRouteRouter;
