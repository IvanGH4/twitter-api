const Tweet = require("../models/Tweet");
const User = require("../models/User");

module.exports = {
  store: async function (req, res) {
    // console.log(req.user);
    const { text } = req.body;
    if (text.length > 2 && text.length < 141) {
      const tweet = await Tweet.create({ text, user: req.user.userId });
      await User.updateOne(
        { _id: req.user.userId },
        {
          $push: {
            tweets: { _id: tweet._id },
          },
        }
      );
      res.json({
        // hay que popularlo con el user
        tweet,
      });
    } else {
      res.status(400).json({
        error: "No se pudo crear el tweet. Intente nuevamente.",
      });
    }
  },

  destroy: async function (req, res) {
    try {
      const { id } = req.body;
      const tweetWithUserInside = await Tweet.findById(id).populate("user");
      await User.updateOne(
        { _id: tweetWithUserInside.user._id },
        {
          $pull: {
            tweets: { $in: [id] },
          },
        }
      );
      await Tweet.deleteOne({ _id: id });
      res.json({
        ok: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: "No se pudo eliminar el tweet.",
      });
    }
  },

  follow: async function (req, res) {
    const { id } = req.body;
    const userToFollow = await User.findById(id).select("followers");

    if (
      userToFollow.followers.some((follower) =>
        follower._id.equals(req.user.userId)
      )
    ) {
      console.log("Ya estas siguiendo a este user.");
      console.log(req.user.userId);
      await User.updateOne(
        { _id: id },
        {
          $pull: {
            followers: { $in: [req.user.userId] },
          },
        }
      );
      await User.updateOne(
        { _id: req.user.userId },
        {
          $pull: {
            following: { $in: [id] },
          },
        }
      );
      res.json({
        ok: true,
        message: "Dejó de seguir a este usuario",
      });
    } else {
      await User.updateOne(
        { _id: id },
        { $push: { followers: req.user.userId } }
      );
      console.log("Ok uno");
      await User.updateOne(
        { _id: req.user.userId },
        { $push: { following: id } }
      );
      console.log("Ok Dos");
      res.json({
        ok: true,
        message: "Comenzó a seguir a este usuario",
      });
    }
  },

  like: async function (req, res) {
    const { id } = req.body;
    const likesOftweetBeeingLiked = await Tweet.findById(id).select("likes");

    if (
      likesOftweetBeeingLiked.likes.some((like) =>
        like._id.equals(req.user.userId)
      )
    ) {
      console.log("Ya le diste like a este tweet.");
      console.log(likesOftweetBeeingLiked._id);
      await Tweet.updateOne(
        { _id: id },
        {
          $pull: {
            likes: { $in: [req.user.userId] },
          },
        }
      );
      await User.updateOne(
        { _id: req.user.userId },
        {
          $pull: {
            liked: { $in: [id] },
          },
        }
      );
      res.json({
        ok: true,
        message: "Esto ya no te gusta",
      });
    } else {
      await Tweet.updateOne({ _id: id }, { $push: { likes: req.user.userId } });
      console.log("Ok uno");
      await User.updateOne({ _id: req.user.userId }, { $push: { liked: id } });
      console.log("Ok Dos");
      res.json({
        ok: true,
        message: "Esto te gusta",
      });
    }
  },
};
