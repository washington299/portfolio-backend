/* eslint-disable consistent-return */
import { HttpRequest, HttpResponse } from '../protocols/http';

export class GetEmailController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: {},
      };
    }

    return { statusCode: 0, body: {} };
  }
}
