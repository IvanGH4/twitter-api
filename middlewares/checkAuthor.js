const Tweet = require("../models/Tweet");
async function checkAuthor(req, res, next) {
  const tweet = await Tweet.findById(req.params.id);
  if (req.user._id.equals(tweet.user)) {
    next();
  } else {
    res.redirect("/?Sucedio_un_errorW!!");
  }
}

module.exports = checkAuthor;
