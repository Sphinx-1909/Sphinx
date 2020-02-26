const router = require('express').Router();
const { Post } = require('../db/index');

router.get('/', (req, res, next) => {
  Post.findAll()
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  Post.findByPk(req.params.id, {})
    .then(post => {
      if (!post) res.status(404).send('Message is not found!');
      res.status(200).send(post);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  Post.create(req.body)
    .then(newPost => {
      res.status(201).send(newPost);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
  Post.findByPk(req.params.id)
    .then(post => {
      if (post) {
        post.update(req.body);
        return res.status(202).send(post);
      }
      res.status(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(postDelete => {
      if (postDelete) return res.sendStatus(204);
      res.sendStatus(404);
    })
    .catch(e => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
