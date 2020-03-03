const router = require('express').Router();
const { Message, User, Channel, ChannelUser } = require('../db/index');
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

router.get('/', (req, res, next) => {
  ChannelUser.findAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

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

router.put('/:id', (req, res, next) => {
  ChannelUser.findByPk(req.params.id)
    .then(subcribedUser => {
      if (subcribedUser) {
        subcribedUser.update(req.body);
        return res.status(202).send(subcribedUser);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

// both these post and delete route are not needed bu tleaving this here just incase. The routes to subscribe and unsubscribe are in channels.js
router.post('/', (req, res, next) => {
  ChannelUser.create({ ...req.body })
    .then(subcribedUser => {
      res.status(201).send(subcribedUser);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  ChannelUser.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(unsubscribeUser => {
      if (unsubscribeUser) return res.sendStatus(204);
      res.sendStatus(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
