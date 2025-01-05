const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
  host: config.EMAIL_SERVICE,
  port: 465,
  auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS
  }
});

const sendEmail = async (user) => {
  try {
    const mailOptions = {
      from:  config.EMAIL_USER,
      to: user.email,
      subject: 'Successfully Created Account',
      html: `
        <h2>Hello ${user.name},</h2>
        <p>Your account has been successfully created.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

const forgetPasswordEmail = async (user, token) => {
  try {
    const mailOptions = {
      from: config.EMAIL_USER,
      to: user.email,
      subject: 'Reset Your Password',
      html: `
        <h2>Hello ${user.name},</h2>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <a href="${config.FrontendUrl}/reset-password/${token}">Reset Password</a>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending password reset email: ', error);
  }
};

module.exports = { sendEmail, forgetPasswordEmail };
