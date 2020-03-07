const router = require('express').Router();
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

router.post('/', (req, res, next) => {
  const { phoneNum } = req.body;
  verify(phoneNum)
    .then(res => {
      // send the request ID over to the frontend for use when the user enters the verification code.
      const reqId = res.request_id
      console.log("reqId: ", reqId)
      res.status(200).send(reqId)
    })
    .catch(e => {
      res.status(400).send(e)
      next(e)
    })
})

// There are 3 functions we need to take care of.
// The first one is to trigger the verification code with the nexmo.verify.request() function. It involves the user’s phone number, and a string for the brand name which will be displayed to the user as the sender.

async function verify(number) {
  return new Promise(function (resolve, reject) {
    nexmo.verify.request({
      number,
      brand: process.env.NEXMO_BRAND_NAME
    }, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// Once your user received the PIN code via SMS, they will have to submit it to the nexmo.verify.check() function, so it can be verified.

async function check(reqId, code) {
  return new Promise(function (resolve, reject) {
    nexmo.verify.check({
      request_id: reqId,
      code,
    }, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// The last function gives your user the option to cancel the verification if they changed their mind. It uses the nexmo.verify.control() function, and again, requires the request ID generated from triggering the PIN code and a string value of cancel.

async function cancel(reqId) {
  return new Promise(function (resolve, reject) {
    nexmo.verify.control({
      request_id: reqId,
      cmd: 'cancel'
    }, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = router;
