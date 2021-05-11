const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: {
      type: String,

      required: [true, "El nombre de usuario es requerido"],
      validate: {
        validator: function (username) {
          return /^[A-Za-z 0-9]+$/.test(username);
        },
        message: (props) => `${props.value}_no_es_un_nombre_de_usuario_valido.`,
      },
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      validate: {
        validator: function (email) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: (props) => `${props.value}_no_es_un_email_valido.`,
      },
    },
    password: String,
    description: String,
    profilePicture: String,
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    liked: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

User.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
module.exports = User;
