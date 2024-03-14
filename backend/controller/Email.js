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

function sendMail(mailOpt) {
  transporter.sendMail(mailOpt, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendMail;
