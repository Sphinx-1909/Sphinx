const { s3, bucketName, bucketRegion } = require('../../amazonConfig')
const router = require('express').Router();
const multer = require('multer')
const { Message } = require('../db/index');
const fs = require('fs')

const upload = multer({ dest: 'uploads/' });

router.post('/', (req, res, next) => {
  s3.putObject({ Bucket: bucketName, ...req.body }, (err, data) => {
    if (err) {
      console.log('error: ', err)
      res.status(400).send(err)
    } else {
      console.log('success! data: ', data)
      res.status(200).send(data)
    }
  })
})

router.post('/file', upload.single('media'), (req, res, next) => {
  const params = {
    Bucket: bucketName,
    Body: fs.createReadStream(req.file.path),
    Key: req.body.key
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log('error: ', err)
      res.status(400).send(err)
    } else {
      console.log('success! data: ', data)
      res.status(200).send(data)
    }
  })
})

router.get('/:Key', (req, res, next) => {
  const { Key } = req.params;
  s3.getObject({ Bucket: bucketName, Key }, (err, data) => {
    if (err) {
      console.log('error: ', err)
      return res.status(400).send(err)
    }
    const objectData = data.Body.toString('utf-8');
    // console.log('success getting data!')
    res.status(200).send(objectData)
  })
})

module.exports = router;