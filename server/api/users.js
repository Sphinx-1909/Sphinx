const router = require('express').Router();
const { User, Message } = require('../db/index');

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Message,
        as: 'message',
      },
    ],
  })
    .then(userOrNull => {
      if (userOrNull) res.status(200).send(userOrNull);
      else {
        res.status(404).send('there is no user with that id');
      }
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(createdUser => {
      res.status(201).send(createdUser);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(userOrNull => {
      if (userOrNull) {
        userOrNull.update(req.body);
        return res.status(202).send(userOrNull);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(userDelete => {
      if (userDelete) return res.sendStatus(204);
      res.sendStatus(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
