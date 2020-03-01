const router = require('express').Router();
const { Message, User, Channel } = require('../db/index');
const USER_ID = require('../../utils');

const userAttributes = [
  'id',
  'firstName',
  'lastName',
  'email',
  // this is commented out b/c database has null enteries right now
  // 'username',
  'latitude',
  'longitude',
];

// get link for users and channels from users model perspective
router.get('/users', (req, res, next) => {
  User.findAll({
    attributes: userAttributes,
    include: {
      model: Channel,
    },
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

// get link for users and channels from channel model perspective
router.get('/channels', (req, res, next) => {
  Channel.findAll({
    include: {
      model: User,
      attributes: userAttributes,
    },
  })
    .then(channels => {
      res.status(200).send(channels);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  Message.create({ ...req.body, senderId: USER_ID })
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
