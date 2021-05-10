const User = require("../models/User");
const Tweet = require("../models/Tweet");

module.exports = {
  index: async function (req, res) {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .limit(7)
      .sort({ createdAt: "desc" });
    const tweets = await Tweet.find({
      user: { $in: req.user.following },
    })
      .populate("user")
      .limit(5)
      .sort({ createdAt: "desc" });
    // console.log(tweets);
    res.render("home", { users, user: req.user, tweets });
  },
};
