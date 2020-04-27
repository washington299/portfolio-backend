import request from 'supertest';
import app from '../config/app';

describe('Email Sender Router', () => {
  test('Should return 200 when email is sent', async () => {
    await request(app)
      .post('/api/send-email')
      .send({
        email: 'any_email@mail.com',
        subject: 'any_subject',
        message: 'any_message',
      })
      .expect(200);
  });
});
