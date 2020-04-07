import { GetEmailController } from './get-email';

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
  });
});
