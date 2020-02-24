const router = require('express').Router();
const { Message } = require('../db/index');

router.get('/', (req, res, next) => {
  Message.findAll()
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
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
