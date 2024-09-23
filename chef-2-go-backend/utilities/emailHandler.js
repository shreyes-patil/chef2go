import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as dotenv from 'dotenv/config';

const sendEmail = async (senderEmail, otp) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `CHEF2GO <${process.env.SENDER_EMAIL}>`,
      to: senderEmail,
      subject: 'Email Verification for CHEF2GO',
      html: `<h2>Welcome to CHEF2GO!</h2><p>Thanks for signing up at CHEF2GO. Your OTP is <b>${otp}</b>, it will expire in 2 minutes.<br></p><h3>See you soon!</h3>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Email not sent due to the error:', error.message);
  }
};

export default sendEmail;
