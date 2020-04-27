import { HttpResponse, HttpRequest } from './http';

export interface Controller {
  handle(controller: HttpRequest): Promise<HttpResponse>;
}
