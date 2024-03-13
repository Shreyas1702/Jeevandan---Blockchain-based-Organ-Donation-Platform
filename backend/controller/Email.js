var nodemailer = require("nodemailer");
const path = require("path");
const viewPath = path.resolve(__dirname, "./../templates/views/");
const partialsPath = path.resolve(__dirname, "./../templates/partials");

const hbs = require("nodemailer-express-handlebars");
const express = require("express");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "crce.9380.aids@gmail.com",
    pass: "fflb wmbw cpvh knnp",
  },
});

var dynamicData = {
  id: 1,
  message: "This is a dynamic message.",
};

var mailOptions = {
  from: "crce.9380.aids@gmail.com",
  to: "sskeni1702@gmail.com",
  subject: "Sending Email using Node.js",
  template: `index`,
  context: dynamicData,
};

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      //extension name
      extName: ".handlebars",
      // layout path declare
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
      express,
    },
    //View path declare
    viewPath: viewPath,
    extName: ".handlebars",
  })
);

// function sendMail(mailOpt) {
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
// }

// module.exports = sendMail;
