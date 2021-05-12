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
    const users = await User.find({ _id: { $ne: req.user.userId } })
      .limit(7)
      .sort({ createdAt: "desc" });
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
};
