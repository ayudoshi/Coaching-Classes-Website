const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');



const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env['GMAIL_USER'],
    pass: process.env['GMAIL_PASS'],
  },
});



async function sendMail(id, email) {
  try {
    const emailToken = jwt.sign({ id: id }, "email1234", {
      expiresIn: '1d',
    })
    const url = `http://localhost:3000/confirmation/${emailToken}`;
    const showUrl = `http://localhost:3000/confirm/email`;

    await transporter.sendMail({
      to: email,
      subject: 'Confirm Email',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = sendMail;