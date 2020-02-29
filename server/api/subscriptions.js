const subscriptionRouter = require('express').Router();
const { Subscriptions } = require('../db/index');

subscriptionRouter.get('/', (req, res, next) => {
  res.send('You are hitting the subscription router');
});

subscriptionRouter.post('/', (req, res, next) => {
  Subscriptions.create(req.body)
    .then(newSub => {
      res.status(201).send(newSub);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = subscriptionRouter;
