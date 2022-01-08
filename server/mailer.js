var nodemailer = require("nodemailer");

function sendNewPasswordByEmail(email, newPassword) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let date = new Date(Date.now());
  var mailOptions = {
    from: "BudgetUP@gmail.com",
    to: email,
    subject: "BudgetUP Password Recovery",
    text: `Your new password is: ${newPassword}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendNewPasswordByEmail };
