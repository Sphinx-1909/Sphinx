const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { db } = require('./db/index');
const enforce = require('express-sslify');
const axios = require('axios');
const session = require('express-session');
const moment = require('moment');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config();

const { User, Session } = require('./db/index');
const cookieParser = require('cookie-parser');

//initialize express
const app = express();
const PORT = process.env.PORT || 4000;

// logger
// if (process.env.NODE_ENV !== 'production') {
//   app.use(require('morgan')('dev'));
// }

//body parsing
// app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use((req, res, next) => {
  req.referer = 'http://localhost:4000/';
  next();
});

app.use((req, res, next) => {
  if (req.cookies.sessionId) {
    User.findOne({
      where: {
        sessionId: req.cookies.sessionId,
      },
    })
      .then(foundUser => {
        if (foundUser) {
          // console.log('user found!')
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
app.use((req, res, next) => {
  if (req.user) {
    // console.log('this is req.user &&&&&&&&&&&&&&&&&&&&&&', req.user.id);
  } else {
    console.log('no req.user');
  }
  next();
});
// service worker route
app.use('/service-worker.js', (req, res) => {
  // res.send(path.resolve(__dirname, '../static', 'service-worker.js'));
  //Are you sure the bottom one is right? This was the original code excluding the typo of staic
  res.send(path.resolve(__dirname, '..', 'static', 'service-worker.js'));
});

// enforce HTTPS ** may be neccessary for the ServiceWorker when deployed to Heroku
// app.use(enforce.HTTPS({ trustProtoHeader: true }));

//auth
app.use(require('./auth'));

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
  .then(() => startServer)
  .then(thing => {
    console.log('this is the return from our startSever promise', thing);
    console.log(chalk.bgMagentaBright(`application started`));
  })
  .catch(e => {
    console.log(chalk.bgMagentaBright(e, `application failed to start`));
  });
