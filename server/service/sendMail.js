const nodemailer = require("nodemailer");
// const { promises } = require("nodemailer/lib/xoauth2");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail,
    pass: process.env.pass,
  },
});

const sendMail = async (to, subject, html) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: process.env.mail,
      to: to,
      subject: subject,
      html: html,
    };
    transporter.sendMail(mailOptions, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
        console.log(result);
      }
    });
  });
};

module.exports = { sendMail };
