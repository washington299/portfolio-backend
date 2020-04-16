import { HttpResponse } from '../protocols/http';
import { ServerError, Success } from '../response-handler';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const ok = (): HttpResponse => ({
  statusCode: 200,
  body: new Success(),
});
