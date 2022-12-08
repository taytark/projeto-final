var multer = require("multer");
var aws = require("aws-sdk");
var multerS3 = require("multer-s3");

var awsMulter = aws.config.update({
  secretAccessKey: process.env.ACESS_SECRET_KEY,
  accessKeyId: process.env.ACESS_KEY_ID,
  region: process.env.REGION,
});
var BUCKET = process.env.BUCKET;
var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

module.exports = {
  awsMulter,
  upload,
  s3
};
