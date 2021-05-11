const Tweet = require("../models/Tweet");
async function checkAuthor(req, res, next) {
  let { id } = req.body;
  const tweet = await Tweet.findById(id);

  if (req.payload.equals(tweet.user)) {
    next();
  } else {
    res.status(401).json({
      error: "No se pudo eliminar el tweet.",
    });
  }
}

module.exports = checkAuthor;
