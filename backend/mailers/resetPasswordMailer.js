const path = require("path");
const nodemailer = require("../config/nodemailer");
const ejs = require("ejs");

module.exports.resetPasswordEmail = async (user) => {
  try {
    let emailHtml = await ejs.renderFile(
      path.join(__dirname, "../views/resetPasswordEmail.ejs"),
      {
        token: user.token,
      }
    );
    const options = {
      from: process.env.EMAIL,
      to: user.email,
      subject: `Reset Password`,
      html: emailHtml,
    };
    await nodemailer.transporter.sendMail(options);
  } catch (error) {
    console.log(`Error in sending mail to reset password ${error}`);
  }
};
