import {
  HttpRequest, HttpResponse, EmailValidator, EmailSender, Controller,
} from '../../protocols';
import { badRequest, serverError, ok } from '../../helpers/http-helpers';
import { MissingParamError, InvalidParamError } from '../../errors';

export class EmailHandlerController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly emailSender: EmailSender;

  constructor(emailValidator: EmailValidator, emailSender: EmailSender) {
    this.emailValidator = emailValidator;
    this.emailSender = emailSender;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'subject', 'message'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, subject, message } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const emailSent = await this.emailSender.send({
        email, subject, message,
      });
      if (!emailSent) {
        return serverError();
      }

      return ok('Message sent, i will anwser as quick as i can :)');
    } catch (error) {
      return serverError();
    }
  }
}
