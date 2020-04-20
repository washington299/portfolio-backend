import { HttpRequest, HttpResponse } from '../../protocols/http';
import { badRequest, serverError, ok } from '../../helpers/http-helpers';
import { MissingParamError, InvalidParamError } from '../../response-handler';
import { EmailValidator } from '../../protocols/email-validator';
import { EmailSending } from '../../protocols/email-sending';

export class GetEmailController {
  private readonly emailValidator: EmailValidator;
  private readonly emailSending: EmailSending;

  constructor(emailValidator: EmailValidator, emailSending: EmailSending) {
    this.emailValidator = emailValidator;
    this.emailSending = emailSending;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
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

      const emailSent = this.emailSending.send(email, subject, message);
      if (!emailSent) {
        return serverError();
      }

      return ok();
    } catch (error) {
      return serverError();
    }
  }
}
