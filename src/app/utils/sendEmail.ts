import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'rockydey077@gmail.com',
      pass: 'trmb ufpw fulp omlc',
    },
  });

  await transporter.sendMail({
    from: 'rockydey077@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset Password Link', // Subject line
    text: 'This link only valid for 10 minutes!', // plain text body
    html, // html body
  });
};
