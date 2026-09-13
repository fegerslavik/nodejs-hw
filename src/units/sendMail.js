import nodemailer from 'nodemailer';

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error(
      'Missing SMTP configuration. Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD to your .env file.',
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
};

export const sendMail = async ({ to, subject, html, text }) => {
  const transporter = getTransporter();
  const sender = process.env.SMTP_FROM || process.env.MAIL_FROM || process.env.SMTP_USER;

  const mailOptions = {
    from: sender,
    to,
    subject,
    html,
    text,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};

export default sendMail;
