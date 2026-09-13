import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from = process.env.SMTP_FROM || process.env.MAIL_FROM || process.env.SMTP_USER,
}) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error('Missing SMTP configuration');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
};
