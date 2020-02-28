const router = require('express').Router();
const { Channel } = require('../db/index');

router.get('/', (req, res, next) => {
  console.log('req in channels', req);
  Channel.findAll()
    .then(channels => {
      res.status(200).send(channels);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  Channel.findByPk(req.params.id)
    .then(channel => {
      if (!channel) res.status(404).send('Channel is not found!');
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
