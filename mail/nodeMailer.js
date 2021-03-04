const nodemailer = require("nodemailer");
const { MAILFROM, MAILTO, PASSWORD } = require("../data");

const mailer = (arg) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAILFROM,
      pass: PASSWORD,
    },
  });

  var mailOptions = {
    from: MAILFROM,
    to: MAILTO,
    subject: "Comment",
    text: arg,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailer;
