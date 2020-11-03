const nodemailer = require("nodemailer");
// const catchAsync = require("../utils/catchAsync");
const { createEmailToken } = require("./token.service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html,
      // to: [process.env.EMAIL_USERNAME],
      // subject: "test nodeMailer",
      // html: `<a href="https://google.com">Go to google</a>`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const verifyEmail = async (email) => {
  const token = await createEmailToken(email);
  const html = `
    <a href="http://localhost:3000/auth/verify/${token}">Verify email</a>
  `;
  await sendEmail(email, "GOIT-hw-nodeJS. Verify account", html);
};

module.exports = { verifyEmail };
