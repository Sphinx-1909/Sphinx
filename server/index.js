const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { db } = require('./db/index');
const enforce = require('express-sslify');
const axios = require('axios');
const session = require('express-session');
const moment = require('moment');

const { User, Session } = require('./db/index');
const cookieParser = require('cookie-parser');

//initialize express
const app = express();
const PORT = process.env.PORT || 4000;

//body parsing
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.cookies.sessionId) {
    User.findOne({
      where: {
        sessionId: req.cookies.sessionId,
      },
    })
      .then(foundUser => {
        if (foundUser) {
          req.user = foundUser;
        }
        next();
      })
      .catch(e => {
        console.log(chalk.red('Error finding sessionId'));
        console.error(e);
        next(e);
      });
  } else {
    Session.create()
      .then(newSession => {
        res.cookie('sessionId', newSession.id, {
          path: '/',
          expires: moment
            .utc()
            .add(1, 'day')
            .toDate(),
        });
        next();
      })
      .catch(e => {
        console.log(chalk.red('Error creating session'));
        console.error(e);
        next(e);
      });
  }
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
