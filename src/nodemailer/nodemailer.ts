import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  auth: {
    user: 'bugtrackerco@outlook.com',
    pass: process.env.NODEMAILER_EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});
