const app = require("./index");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

app.listen("8000", (req, res) => {
  console.log("Listening to the server");
});
