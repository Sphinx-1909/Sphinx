const router = require('express').Router();
const { Message, User, Subscriptions, Channel } = require('../db/index');
const webpush = require('web-push');
const Sequelize = require('sequelize');

// adding this route as it helps with debugging when looking at the JSON. Can remove later
// get all messages

router.get('/', (req, res, next) => {
  Message.findAll({
    include: [
      {
        model: Channel,
      },
    ],
  })
    .then(message => {
      if (!message) res.status(404).send('Messages is not found!');
      res.status(200).send(message);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

// get all READ messages for user

router.get('/read', (req, res, next) => {
  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    console.log('no req.user in messages.js line 33');
  }
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then(user => {
      if (user) {
        user
          .getMessages()
          .then(readMessages => res.status(200).send(readMessages))
          .catch(e => {
            res.status(404).send('messages not found', e);
            next(e);
          });
      } else {
        res.status(400).send('user not found');
      }
    })
    .catch(e => console.log('error finding subscriptions: ', e));
});

// mark a message as read

router.post('/readmessage/:messageId', (req, res, next) => {
  const { messageId } = req.params;
  // ** copy a userId from your local channelUsers table and paste it below **
  const userId = req.user.id;
  Message.findOne({
    where: {
      id: messageId,
    },
  }).then(message => {
    if (message) {
      User.findOne({
        where: {
          id: userId,
        },
      }).then(user => {
        if (user) {
          message
            .addUser(user)
            .then(read => res.status(200).send(read))
            .catch(e => console.log('error adding readBy: ', e));
        } else {
          res.status(404).send('user not found');
        }
      });
    } else {
      res.status(404).send('message not found');
    }
  });
});

router.get('/:id', (req, res, next) => {
  Message.findByPk(req.params.id, {})
    .then(message => {
      if (!message) return res.status(404).send('Message is not found!');
      return res.status(200).send(message);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    console.log('no req.user in messages.js line 110');
  }
  console.log('req.body in post', req.body);
  Message.create({ ...req.body, senderId: userId })
    .then(newMessage => {
      //PUSH NOTIFICATION CODE *************
      webpush.setVapidDetails(
        'mailto:info@sphinx.com',
        'BJZp_1rq7Cjl2Ij8-9GI4UnTG2jCB5MUvWyZRFh93VP9Wy2SKjNBDqiW-X1sQHud0Pc2BmNOsylUVSDznPTGk4g',
        'x1vE_-P1CGwt2B3us3QHXbaEHlQ94eIBsUAYJu8HGKs'
      );
      Subscriptions.findAll().then(sub => {
        sub.forEach(subscription => {
          const pushConfig = {
            endpoint: subscription.endpoint,
            keys: {
              auth: subscription.auth,
              p256dh: subscription.p256dh,
            },
          };
          webpush
            .sendNotification(
              pushConfig,
              JSON.stringify({
                title: 'new message',
                content: 'new messages added',
              })
            )
            .catch(e => {
              console.log(e);
            });
        });
      });
      //PUSH NOTIFICATION CODE *************
      res.status(201).send(newMessage);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  Message.findByPk(req.params.id)
    .then(message => {
      if (message) {
        message.update(req.body);
        return res.status(202).send(message);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/upvote/:id', (req, res, next) => {
  Message.findByPk(req.params.id)
    .then(message => {
      if (message) {
        message.increment(
          { positiveVotes: 1 },
          { where: { id: req.params.id } }
        );
        return res.status(202).send(message);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/downvote/:id', (req, res, next) => {
  Message.findByPk(req.params.id)
    .then(message => {
      if (message) {
        message.decrement(
          { negativeVotes: 1 },
          { where: { id: req.params.id } }
        );
        return res.status(202).send(message);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  Message.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(messageDelete => {
      if (messageDelete) return res.sendStatus(204);
      res.sendStatus(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
