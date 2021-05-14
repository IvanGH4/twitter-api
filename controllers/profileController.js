const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const s3 = require("../awsConfig");
const User = require("../models/User");

module.exports = {
  show: async function (req, res) {
    let { username } = req.query;
    const user = await User.findOne({ userName: username })
      .populate({ path: "tweets", options: { sort: { createdAt: "desc" } } })
      .populate("followers")
      .populate("following");
    res.json({
      user,
    });
  },

  update: async function (req, res) {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      console.log(files);
      const ext = path.extname(files.image.path);
      const newFileName = `image_${Date.now()}${ext}`;

      const params = {
        ACL: "public-read",
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `avatars/${newFileName}`,
        ContentType: files.image.type,
        Body: fs.createReadStream(files.image.path),
      };
      const data = await s3.upload(params).promise();
      console.log(data.Location);
      const { firstName, lastName, bio } = fields;
      await User.updateOne(
        { userName: req.user.userName },
        {
          firstName,
          lastName,
          description: bio,
          profilePicture: data.Location,
        }
      );
      res.json({
        ok: true,
      });
    });
  },
};
