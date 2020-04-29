import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { EmailSenderParams, EmailSender } from '../protocols';

export class EmailSenderAdapter implements EmailSender {
  send(msg: EmailSenderParams): boolean {
    try {
      const { email, subject, message } = msg;
      const auth = {
        auth: {
          api_key: `${process.env.EMAIL_API_KEY}`,
          domain: `${process.env.EMAIL_API_URL}`,
        },
      };

      const transporter = nodemailer.createTransport(mg(auth));

      const mailConfig = {
        from: email,
        to: process.env.EMAIL_DESTINATION,
        subject,
        text: message,
        html: `
          <h2>${subject}</h2>
          <p>Hi, washington! ${message}</p>
          `,
      };

      transporter.sendMail(mailConfig, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
