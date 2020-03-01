const router = require('express').Router();
const { User } = require('../db/index');

router.post('/login', (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
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
      res.status(404).send('User not found');
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

  res
    .status(204)
    .clearCookie('sessionId')
    .send();
  // next();
});

router.get('/me', (req, res, next) => {
  if (req.user) return res.send(req.user);

  res.status(401).send('Unauthorized');
});

module.exports = router;
