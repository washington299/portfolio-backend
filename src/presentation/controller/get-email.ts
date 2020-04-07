/* eslint-disable consistent-return */
import { HttpRequest, HttpResponse } from '../protocols/http';

export class GetEmailController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name || !httpRequest.body.email) {
      return {
        statusCode: 400,
        body: {},
      };
    }

    return { statusCode: 0, body: {} };
  }
}
