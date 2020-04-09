/* eslint-disable consistent-return */
import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamError } from '../errors/invalid-param-error';


export class GetEmailController {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'message'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field),
        };
      }
    }

    const { email } = httpRequest.body;
    const isValid = this.emailValidator.isValid(email);
    if (!isValid) {
      return {
        statusCode: 400,
        body: new InvalidParamError('email'),
      };
    }

    return { statusCode: 0, body: {} };
  }
}
