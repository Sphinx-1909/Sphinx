const router = require('express').Router();
const { ChannelUser } = require('../db/index');

router.get('/', (req, res, next) => {
  ChannelUser.findAll()
    .then(channelUserLinks => {
      res.status(200).send(channelUserLinks);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  ChannelUser.findByPk(req.params.id)
    .then(channelUserLink => {
      if (!channelUserLink)
        res.status(404).send('Channel user link is not found!');
      res.status(200).send(channelUserLink);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  ChannelUser.create(req.body)
    .then(channelUserLink => {
      res.status(201).send(channelUserLink);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  ChannelUser.findByPk(req.params.id)
    .then(channelUserLink => {
      if (channelUserLink) {
        channelUserLink.update(req.body);
        return res.status(202).send(channelUserLink);
      }
      res.status(404).send('channelUserLink Not Found');
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
    .then(channelUserLinkDelete => {
      if (channelUserLinkDelete) return res.sendStatus(204);
      res.sendStatus(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
