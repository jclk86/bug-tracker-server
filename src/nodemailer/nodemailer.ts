import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: 'jcnyg1986@gmail.com', // generated ethereal user
//     pass: 'IsTh1sReallyWeird?1986' // generated ethereal password
//   }
// });

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
