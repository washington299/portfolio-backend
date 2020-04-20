import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBeFalsy();
  });

  test('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('valid_email@mail.com');
    expect(isValid).toBeTruthy();
  });

  test('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    const email = 'any_email@mail.com';
    sut.isValid(email);
    expect(isEmailSpy).toBeCalledWith('any_email@mail.com');
  });
});
