import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

export const sendEmail = (email: string, accountId: string): void => {
  return transporter.sendMail(
    {
      from: `"BugTrackerCo" <${process.env.NODEMAILER_EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: 'Complete registration for BugTrackerCo', // Subject line
      text: 'Complete your registration by clicking on the link', // plain text body
      html: `<p>Click <a href="http://localhost:8000/user/account/${accountId}">here</a> to complete registration</p>` // html body
    },
    function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info.response);
    }
  );
};
