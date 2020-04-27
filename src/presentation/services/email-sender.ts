import nodemailer from 'nodemailer';
import { EmailSenderParams, EmailSender } from '../protocols';

export class EmailSenderAdapter implements EmailSender {
  async send(msg: EmailSenderParams): Promise<boolean> {
    try {
      const { email, subject, message } = msg;
      const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '588b96b2345445',
          pass: '8cfc73c5ff3387',
        },
      });

      await transporter.sendMail({
        from: `<${email}>`,
        to: 'washingtoncampos9@gmail.com',
        subject,
        text: message,
        html: `
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
