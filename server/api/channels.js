const router = require('express').Router();
const { Op } = require('sequelize');
const { Channel, User, Message, readBy } = require('../db/index');
const USER_ID = require('../../utils');

//get all channels
router.get('/all', (req, res, next) => {
  Channel.findAll()
    .then(channels => {
      if (!channels) res.status(404).send('Channels is not found!');
      res.status(200).send(channels);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.get('/', (req, res, next) => {
  const userId = USER_ID;
  // the above should eventually be changed to: const userId = req.user.id;
  User.findOne({
    where: {
      id: userId,
    },
  }).then(user => {
    if (user) {
      user
        .getChannels({
          include: [
            {
              model: Message,
              required: false,
              where: {
                // don't include messages sent by current user
                senderId: {
                  [Op.not]: user.id,
                },
              },
            },
          ],
        })
        .then(subscriptions => res.status(200).send(subscriptions))
        .catch(e => console.log('error finding subscriptions: ', e));
    } else {
      res.status(400).send('user not found');
    }
  });
});

router.get('/:id', (req, res, next) => {
  Channel.findByPk(req.params.id)
    .then(channel => {
      if (!channel) return res.status(404).send('Channel is not found!');
      res.status(200).send(channel);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  Channel.create(req.body)
    .then(newChannel => {
      res.status(201).send(newChannel);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/subscribe/:channelId', (req, res, next) => {
  const { channelId } = req.params;
  User.findOne({
    where: {
      id: USER_ID,
    },
  }).then(user => {
    if (user) {
      Channel.findOne({
        where: {
          id: channelId,
        },
      }).then(channel => {
        if (channel) {
          user
            .addChannel(channel, {
              //added this because default when joining is always false for moderators and owner. Channel admin should have way to make people moderator but i guess this is a T2 or stretch goal
              through: { isModerator: false, isOwner: false },
            })
            .then(subscription => res.status(200).send(subscription))
            .catch(e => {
              res.status(400).send('error creating subscription: ', e);
              next(e);
            });
        } else {
          res.status(400).send('channel not found');
        }
      });
    } else {
      res.status(400).send('user not found');
    }
  });
});

router.delete('/unsubscribe/:channelId', (req, res, next) => {
  const { channelId } = req.params;
  User.findOne({
    where: {
      id: USER_ID,
    },
  }).then(user => {
    if (user) {
      user.removeChannel(channelId);
    } else {
      res.status(400).send('user not found');
    }
  });
});

router.put('/:id', (req, res, next) => {
  Channel.findByPk(req.params.id)
    .then(channel => {
      if (channel) {
        channel.update(req.body);
        return res.status(202).send(channel);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  Channel.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(channelDelete => {
      if (channelDelete) return res.sendStatus(204);
      res.sendStatus(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
