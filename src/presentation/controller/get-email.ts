/* eslint-disable consistent-return */
import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';

export class GetEmailController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email'),
      };
    }
    if (!httpRequest.body.message) {
      return {
        statusCode: 400,
        body: new MissingParamError('message'),
      };
    }

    return { statusCode: 0, body: {} };
  }
}
