const Tweet = require("../models/Tweet");
const User = require("../models/User");

module.exports = {
  store: async function (req, res) {
    const { text } = req.body;
    if (text.length > 2 && text.length < 141) {
      const tweet = await Tweet.create({ text, user: req.user });
      await User.updateOne(
        { _id: req.user._id },
        {
          $push: {
            tweets: { _id: tweet._id },
          },
        }
      );
      res.redirect("/");
    } else {
      res.redirect("/?Sucedio_un_errorA!!");
    }
  },

  destroy: async function (req, res) {
    try {
      const { id } = req.params;
      const tweetWithUserInside = await Tweet.findById(id).populate("user");
      await User.updateOne(
        { _id: tweetWithUserInside.user._id },
        {
          $pull: {
            tweets: { $in: [id] },
          },
        }
      );
      await Tweet.remove({ _id: id });
      res.redirect("back");
    } catch (err) {
      console.log(err);
      res.redirect("/?Sucedio_un_errorS!!");
    }
  },

  follow: async function (req, res) {
    const { id } = req.params;
    const userToFollow = await User.findById(id).select("followers");

    if (
      userToFollow.followers.some((follower) =>
        follower._id.equals(req.user._id)
      )
    ) {
      console.log("Ya estas siguiendo a este user.");
      console.log(req.user._id);
      await User.updateOne(
        { _id: id },
        {
          $pull: {
            followers: { $in: [req.user._id] },
          },
        }
      );
      await User.updateOne(
        { _id: req.user._id },
        {
          $pull: {
            following: { $in: [id] },
          },
        }
      );
      res.redirect("back");
    } else {
      await User.updateOne({ _id: id }, { $push: { followers: req.user._id } });
      console.log("Ok uno");
      await User.updateOne({ _id: req.user._id }, { $push: { following: id } });
      console.log("Ok Dos");
      res.redirect("back");
    }
  },

  like: async function (req, res) {
    const { id } = req.params;
    const likesOftweetBeeingLiked = await Tweet.findById(id).select("likes");

    if (
      likesOftweetBeeingLiked.likes.some((like) =>
        like._id.equals(req.user._id)
      )
    ) {
      console.log("Ya le diste like a este tweet.");
      console.log(likesOftweetBeeingLiked._id);
      await Tweet.updateOne(
        { _id: id },
        {
          $pull: {
            likes: { $in: [req.user._id] },
          },
        }
      );
      await User.updateOne(
        { _id: req.user._id },
        {
          $pull: {
            liked: { $in: [id] },
          },
        }
      );
      res.redirect("back");
    } else {
      await Tweet.updateOne({ _id: id }, { $push: { likes: req.user._id } });
      console.log("Ok uno");
      await User.updateOne({ _id: req.user._id }, { $push: { liked: id } });
      console.log("Ok Dos");
      res.redirect("back");
    }
  },

  searchUser: async function (req, res) {
    let { username } = req.body;
    const user = await User.findOne({ userName: username });
    if (user) {
      res.redirect(`/usuario/${user.userName}`);
    } else {
      res.redirect("back");
    }
  },
};
