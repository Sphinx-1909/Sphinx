const router = require('express').Router();
const { User } = require('../db/index');

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
        );
        res.status(202).send(foundUser);
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
      req.session.userId = user.id;
      console.log('signUp user in auth/index.js', user);
      return res.status(200).send(user);
    })
    .catch(next);
});

// Check to see if user is logged in at each app start. <App /> component
// Check if there is a session associated with their browser-cookie. *
// if there is we want to find user in DB and return user info to front end and mark their status as logged in

router.get('/signout', (req, res, next) => {
  delete req.session.userId;

  res.sendStatus(204);
  next();
});

router.get('/me', (req, res, next) => {
  //console.log('req.user', req.user);
  if (req.user) return res.send(req.user);
  // res.status(401).send('no prior login!');
  res.status(401).send('Unauthorized');
  // const err = new Error('Not logged in');
  // console.error(err);
  // next();
});

module.exports = router;
