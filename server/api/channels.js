const router = require('express').Router();
const { Op } = require('sequelize');
const { Channel, User, Message, readBy, ChannelUser } = require('../db/index');

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

// adding this route for the use of feed? This a modified version of the api/channels route to get messages that are not read.
router.get('/withunreadmessages', (req, res, next) => {
  const userId = req.user.id;
  // the above should eventually be changed to: const userId = req.user.id;
  User.findOne({
    where: {
      id: userId,
    },
  }).then(user => {
    if (user) {
      // fetch all messages in messageUser / readBy table that is matching the user found from previous query and then map all messageIds to an array to be used in 46-48
      const userReadMessages = user
        .getMessages({ joinTableAttributes: ['messageId'] })
        .map(message => message.id);

      console.log('userReadMessages', userReadMessages);
      // fetch the channels and join the messages where messages are not created by user and messages not found in messageUser / readBy table
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
                // added
                id: {
                  [Op.notIn]: userReadMessages,
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

router.get('/', (req, res, next) => {
  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    console.log('no req.user in channel.js line 66');
  }
  // console.log('userId: ', userId);
  // the above should eventually be changed to: const userId = req.user.id;
  User.findOne({
    where: {
      id: req.params.id || userId,
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
//include channel and include all subscribers
router.get('/:id', (req, res, next) => {
  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    console.log('no req.user in channel.js line 66');
  }
  // console.log('userId: ', userId);
  // the above should eventually be changed to: const userId = req.user.id;
  User.findOne({
    where: {
      id: userId,
    },
  }).then(user => {
    if (user) {
      user
        .getChannels({
          where: {
            // don't include messages sent by current user
            id: {
              [Op.eq]: req.params.id,
            },
          },
        })
        //need to do index of 0 because when using sequelize methods for m:m you get an array. And this works here because we are always only finding 1 channel
        .then(userChannel => res.status(200).send(userChannel[0]))
        .catch(e => console.log('error finding userChannel: ', e));
    } else {
      res.status(400).send('user not found');
    }
  });
});
//includes the users/ subscribers of the channel
router.get('/users/:channelId', (req, res, next) => {
  Channel.findByPk(req.params.channelId, { include: { model: User } })
    .then(channel => {
      if (!channel) return res.status(404).send('Channel is not found!');
      console.log('channel inside router.get(/users/:channelId', channel);
      res.status(200).send(channel);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

// router.post('/', (req, res, next) => {
//   Channel.create(req.body)
//     .then(newChannel => {

//       res.status(201).send(newChannel);
//     })
//     .catch(e => {
//       console.error(e);
//       next(e);
//     });
// });
router.post('/', (req, res, next) => {
  console.log('channels post route createNewChannel', req.body);
  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    console.log('no req.user in channel.js line 128');
  }
  User.findOne({
    where: {
      id: userId,
    },
  }).then(user => {
    if (user) {
      Channel.create(req.body)
        .then(newChannel => {
          user
            .addChannel(newChannel, {
              through: { isModerator: true, isOwner: true },
            })
            .then(() => {
              console.log('createdSetAdmin new channel', newChannel);
              Channel.findOne({
                where: {
                  id: newChannel.id,
                },
                include: { model: Message },
              }).then(foundChannel => {
                if (foundChannel) {
                  return res.status(200).send(foundChannel);
                }
              });
            });
        })
        .catch(e => console.log('error adding messages to channel', e));
    } else {
      res.status(400).send('user not found');
    }
  });
});

//create channel
//update the join table by setting current user userId to isOwner
// this channel should be added to myCHannels and allChannels

router.post('/subscribe/:channelId', (req, res, next) => {
  const { channelId } = req.params;
  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    console.log('no req.user in channel.js line 128');
  }
  User.findOne({
    where: {
      id: userId,
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
      id: req.user.id,
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

// //get channel to edit that the user is an owner of adn add moderators
// router.put('/:id', (req, res, next) => {
//   // async/awwait
//   Channel.findByPk(req.params.id)
//     .then(channel => {
//       if (channel) {
//         channel.update(req.body); // async deal with it!

//         //find users that are subscribed to channel with userName information
//         //add moderators
//         //
//         return res.status(202).send(channel);
//       }
//       res.status(404);
//     })
//     .catch(e => {
//       console.error(e);
//       next(e);
//     });
// });

module.exports = router;
