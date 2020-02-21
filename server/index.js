const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { db } = require("./db/index");

//initialize express
const app = express();
const PORT = process.env.PORT || 4000;

// static Middleware
app.use(express.static(path.join(__dirname, "../static")));

// api routes
app.use("/api", require("./api"));

//route catch
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/index.html"));
});

// start server
const startServer = new Promise((res, rej) => {
  app.listen(PORT, () => {
    console.log(chalk.bgRedBright(`app is listening on port ${PORT}`));
    res(true);
  });
});

db.sync()
  .then(startServer)
  .then(() => {
    console.log(chalk.bgMagentaBright(`application started`));
  })
  .catch(e => {
    console.log(chalk.bgMagentaBright(`application failed to start`));
  });
