import { GetEmailController } from './get-email';
import { MissingParamError } from '../errors/missing-param-error';

describe('Get Email from Client', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new GetEmailController();
    const httpRequest = {
      body: {
        email: 'valid_email',
        mensage: 'valid_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no email is provided', () => {
    const sut = new GetEmailController();
    const httpRequest = {
      body: {
        name: 'valid_name',
        mensage: 'valid_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no message is provided', () => {
    const sut = new GetEmailController();
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('message'));
  });
});
