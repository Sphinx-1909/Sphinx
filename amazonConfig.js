const AWS = require('aws-sdk');
const bucketName = "1909-sphinx-dev";
const bucketRegion = "us-east-2";
const IdentityPoolId = "us-east-2:8191ea6b-a428-448a-a89f-4d2a02cd6b3b";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName }
});

// console.log('s3: ', s3)

module.exports = {
  bucketName,
  bucketRegion,
  s3
}