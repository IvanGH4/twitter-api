const User = require("../models/User");
const Tweet = require("../models/Tweet");

module.exports = {
  index: async function (req, res) {
    const users = await User.find();
    res.json({
      users,
    });
  },

  indexUsers: async function (req, res) {
    const users = await User.aggregate([{ $sample: { size: 7 } }]);
    res.json({
      users,
    });
  },

  indexTweets: async function (req, res) {
    const user = await User.findById(req.user.userId).select("following");
    const tweets = await Tweet.find({
      user: { $in: [...user.following, req.user.userId] },
    })
      .populate("user")
      .sort({ createdAt: "desc" });
    // console.log(tweets);
    res.json({ tweets });
  },

  indexUser: async function (req, res) {
    const { userId } = req.query;
    const tweets = await Tweet.find({
      user: userId,
    })
      .populate("user")
      .sort({ createdAt: "desc" });
    res.json({ tweets });
  },
};
