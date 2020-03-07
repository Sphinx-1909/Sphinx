const apiRouter = require('express').Router();

// API ROUTES
apiRouter.use('/testRoute', require('./testRoute'));
apiRouter.use('/users', require('./users'));
apiRouter.use('/messages', require('./messages'));
apiRouter.use('/channels', require('./channels'));
apiRouter.use('/channelusers', require('./channelUsers'));
apiRouter.use('/subscription', require('./subscriptions'));
apiRouter.use('/aws', require('./aws'))
apiRouter.use('/nexmo', require('../auth/nexmo'))

// API catch and let pass
apiRouter.use((req, res, next) => {
  const err = new Error('API route not found');
  console.error(err);
  err.status = 404;
  next(err);
});

module.exports = apiRouter;
