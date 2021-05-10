require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const passportAuth = require("./passport");
const flash = require("express-flash");
const privateRoutes = require("./routes/privateRoutes");
const path = require("path");

const seeder = require("./seeder");

const port = 3000;

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

passportAuth(app);

app.use(privateRoutes);

app.use(routes);

// seeder();

mongoose.connect(process.env.MONGOOSECONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("[Database] working!"))
  .on("error", (error) => console.log(error));

app.listen(port, () => {
  console.log("Server listening!");
});
