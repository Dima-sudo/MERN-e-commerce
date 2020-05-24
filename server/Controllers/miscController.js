const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_ADMIN_EMAIL,
    pass: process.env.NODEMAILER_ADMIN_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.contact = async (req, res) => {
  const { content, title, from } = req.body;

  let mailConfig = {
    from: from,
    to: process.env.NODEMAILER_ADMIN_EMAIL,
    subject: title,
    html: `<h2>${title}</h2> <p>${content}</p> <br> <p>Sender: ${from}</p>`,
  };

  try {
    await transporter.sendMail(mailConfig);
    return res.status(200).json({
      message: "Your email has been sent",
      status: "success",
    });
  } catch (err) {
    return res.status(200).json({
      message: "Could not send your email",
      error: err.message,
      status: "failure",
    });
  }
};
