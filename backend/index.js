if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const User = require("./models/user");
const userRoutes = require("./route/user");
const sendMail = require("./controller/Email");
const path = require("path");
const viewPath = path.resolve(__dirname, "./templates/views/");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.ATLAS;
const secret = process.env.SECRET || "thisshouldbeabettersecret";

const store = new MongoStore({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

const sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  //   res.locals.error = req.flash("error");
  //   res.locals.success = req.flash("success");

  next();
});

app.get("/", (req, res) => {
  var mailOptions = {
    from: "crce.9380.aids@gmail.com",
    to: "sskeni1702@gmail.com",
    subject: "Sending Email using Node.js",
    text: `Hello There Shreyas Over here Id :- ${7}`,
  };

  sendMail(mailOptions);
});

app.use("/", userRoutes);

module.exports = app;
