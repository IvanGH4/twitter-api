const Tweet = require("../models/Tweet");
async function checkAuthor(req, res, next) {
  let { id } = req.body;
  const tweet = await Tweet.findById(id);
  console.log(tweet);

  // console.log(typeof tweet.user._id);
  // console.log(typeof req.payload.userId);

  if (req.user.userId === tweet.user.toString()) {
    next();
  } else {
    res.json({
      ok: false,
    });
  }
}

module.exports = checkAuthor;
