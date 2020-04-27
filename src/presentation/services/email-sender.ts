import nodemailer from 'nodemailer';
import { EmailSenderParams, EmailSender } from '../protocols';

export class EmailSenderAdapter implements EmailSender {
  async send(msg: EmailSenderParams): Promise<boolean> {
    try {
      const { email, subject, message } = msg;
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        to: process.env.EMAIL_DESTINATION,
        subject,
        text: message,
        html: `
          <div style="text-align: center">${email}</div>
          <h2>${subject}</h2>
          <p>${message}</p>
        `,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
