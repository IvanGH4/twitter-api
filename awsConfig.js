const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_S3_BUCKET_REGION });
const s3 = new AWS.S3({
  apiVersion: process.env.AWS_S3_API_VERSION,
  accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
});

module.exports = s3;
