const router = require('express').Router();
const { User, Session } = require('../db/index');
const chalk = require('chalk');
const moment = require('moment');

router.post('/login', (req, res, next) => {
  // console.log(req.body.email);
  // console.log(req.body.password);
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then(foundUser => {
      // console.log('req.cookies.sessionId: ', req.cookies.sessionId)
      if (foundUser) {
        User.update(
          {
            sessionId: req.cookies.sessionId,
          },
          {
            where: {
              id: foundUser.id,
            },
          }
        )
          .then(() => {
            return res.status(202).send(foundUser);
          })
          .catch(e => {
            console.log('error in login', e);
          });
      } else {
        res.status(400).send('No matching user');
      }
    })
    .catch(e => {
      res.status(404).send('User not found', e);
    });
});

router.post('/signup', (req, res, next) => {
  User.findOrCreate({
    where: req.body,
  })
    .then(user => {
      if (!user) return res.status(500).send('error creating user');
      console.log('req.session', req.session);
      console.log('req.cookie', req.cookie);
      req.session.userId = user.id;
      console.log('signUp user in auth/index.js', user);
      return res.status(200).send(user);
    })
    .catch(next);
});

router.get('/signout', (req, res, next) => {
  console.log('delete in index req.session.userId', req.cookies);
  res.clearCookie('sessionId');
  Session.create()
    .then(newSession => {
      console.log('created new session in /signout route');
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
});

router.get('/me', (req, res, next) => {
  // heartbeat
  if (req.user) return res.send(req.user);
  res.status(403).send('Sending Unauthorized from index.js req.user line 64');
});

module.exports = router;
