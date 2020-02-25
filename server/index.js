const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { db } = require('./db/index');
const enforce = require('express-sslify');
const axios = require('axios');
const session = require('express-session');

const { User } = require('./db/index');

//initialize express
const app = express();
const PORT = process.env.PORT || 4000;

//body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(chalk.cyan(`${new Date().toString()}: ${req.path}`));
  next();
});

// authentication and cookies
app.use(
  session({
    secret: 'secretcookie',
    resave: false,
    cookie: {
      maxAge: 7.2 * Math.exp(10, 6), // 2 hours
    },
  })
);

// session logging
app.use((req, res, next) => {
  //console.log('session', req.session);
  next();
});

app.use((req, res, next) => {
  User.findByPk(req.session.userId)
    .then(userOrNull => {
      if (!userOrNull) req.loggedIn = false;
      else {
        req.loggedIn = true;
        req.user = userOrNull;
      }

      next();
    })
    .catch(e => {
      console.log('error searching for a user by session.userId');
      console.error(e);
      next();
    });
});

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
