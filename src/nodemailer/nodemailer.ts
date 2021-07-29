import nodemailer from 'nodemailer';

// pool and rateLimit/ rateDelta allow for sometime before each email sent.
// Prevents concurrent connections limit exceeded issue
// https://stackoverflow.com/questions/53366844/nodejs-setting-a-timeout-for-nodemailer
export const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  pool: true,
  rateLimit: 1,
  rateDelta: 3000,
  maxConnections: 1,
  maxMessages: 1,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
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
        // can throw error here
        console.log(err);
        return;
      }
      // can remove
      console.log(info.response);
    }
  );
};
