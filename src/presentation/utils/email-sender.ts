import nodemailer from 'nodemailer';
import { EmailSenderParams, EmailSender } from '../protocols';

export class EmailSenderAdapter implements EmailSender {
  async send(message: EmailSenderParams): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '588b96b2345445',
          pass: '8cfc73c5ff3387',
        },
      });

      await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: 'bar@example.com, baz@example.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
