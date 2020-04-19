import validor from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validor, 'isEmail').mockReturnValue(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBeFalsy();
  });
});
