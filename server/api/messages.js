const router = require('express').Router();
const { Message, User } = require('../db/index');
const USER_ID = require('../../utils')

// get all READ messages for user

router.get('/read', (req, res, next) => {
  const userId = USER_ID
  // the above should eventually be changed to: const userId = req.user.id;
  User.findOne({
    where: {
      id: userId,
    }
  })
    .then(user => {
      if (user) {
        user.getMessages()
          .then(readMessages => res.status(200).send(readMessages))
          .catch(e => {
            res.status(404).send('messages not found', e)
            next(e)
          })
      } else {
        res.status(400).send('user not found')
      }
    })
    .catch(e => console.log('error finding subscriptions: ', e))
});

// mark a message as read

router.post('/read/:messageId', (req, res, next) => {
  const { messageId } = req.params;
  // ** copy a userId from your local channelUsers table and paste it below **
  const userId = USER_ID
  // the above should eventually be changed to: const userId = req.user.id;
  Message.findOne({
    where: {
      id: messageId,
    }
  })
    .then(message => {
      if (message) {
        User.findOne({
          where: {
            id: userId,
          }
        })
          .then(user => {
            if (user) {
              message.addUser(user)
                .then(read => res.status(200).send(read))
                .catch(e => console.log('error adding readBy: ', e))
            } else {
              res.status(404).send('user not found')
            }
          })
      } else {
        res.status(404).send('message not found')
      }
    })
});

router.get('/:id', (req, res, next) => {
  Message.findByPk(req.params.id, {})
    .then(message => {
      if (!message) res.status(404).send('Message is not found!');
      res.status(200).send(message);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  Message.create(req.body)
    .then(newMessage => {
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
