const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { db } = require('./db/index');
const enforce = require('express-sslify');

//initialize express
const app = express();
const PORT = process.env.PORT || 4000;

// static Middleware
app.use(express.static(path.join(__dirname, '../static')));

// service worker route
app.use('/service-worker.js', (req, res) => {
  res.send(path.resolve(__dirname, '..', 'staic', 'service-worker.js'));
});

// enforce HTTPS ** may be neccessary for the ServiceWorker when deployed to Heroku
// app.use(enforce.HTTPS({ trustProtoHeader: true }));

// api routes
app.use('/api', require('./api'));

//route catch
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
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
