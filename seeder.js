const User = require("./models/User");
const Tweet = require("./models/Tweet");

const faker = require("faker");
const img = [
  "about-bg.jpm",
  "arrascaeta-757776.jpg",
  "contact-bg.jpg",
  "home-bg.jpg",
  "pan-semillas-473675.jpg",
  "post-bg.jpg",
  "post-sample-image.jpg",
  "758302.jpg",
];

faker.locale = "es";

const users = [];
const tweets = [];

const seeder = async () => {
  for (let i = 0; i < 5; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      profilePicture: img[Math.floor(Math.random() * 7 + 1)],
    });
  }

  await User.insertMany(users);

  const usersIds = [];

  const usersDB = await User.find();

  usersDB.forEach((user) => {
    usersIds.push(user._id);
  });

  for (let i = 0; i < 5; i++) {
    tweets.push({
      text: faker.lorem.sentence(10),
      user: usersIds[Math.floor(Math.random() * usersIds.length)],
    });
  }

  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder.");
};

module.exports = seeder;
