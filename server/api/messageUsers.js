const router = require('express').Router();
const { MessageUser } = require('../db/index');

router.get('/', (req, res, next) => {
  MessageUser.findAll()
    .then(messageUserLinks => {
      res.status(200).send(messageUserLinks);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  MessageUser.findByPk(req.params.id)
    .then(messageUserLink => {
      if (!messageUserLink)
        res.status(404).send('Channel user link is not found!');
      res.status(200).send(messageUserLink);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  MessageUser.create(req.body)
    .then(messageUserLink => {
      res.status(201).send(messageUserLink);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  MessageUser.findByPk(req.params.id)
    .then(messageUserLink => {
      if (messageUserLink) {
        messageUserLink.update(req.body);
        return res.status(202).send(messageUserLink);
      }
      res.status(404).send('messageUserLink Not Found');
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  MessageUser.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(messageUserLinkDelete => {
      if (messageUserLinkDelete) return res.sendStatus(204);
      res.sendStatus(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
