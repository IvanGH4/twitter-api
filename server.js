require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const cors = require("cors");

const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

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
