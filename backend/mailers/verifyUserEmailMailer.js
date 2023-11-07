const nodemailer = require("../config/nodemailer");
const ejs = require("ejs");
const path = require("path");
module.exports.verifyUserEmailMailer = async (userEmail) => {
  try {
    let emailHtml = await ejs.renderFile(
      path.join(__dirname, "../views/verifyUserEmail.ejs")
    );
    const options = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Verify User",
      html: emailHtml,
    };

    await nodemailer.transporter.sendMail(options);
  } catch (error) {
    console.log("Error in sending mail", error);
  }
};
