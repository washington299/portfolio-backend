import { GetEmailController } from './get-email';
import {
  MissingParamError, InvalidParamError, ServerError, Success,
} from '../../response-handler';
import { EmailSender, EmailSenderParams, EmailValidator } from '../../protocols';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeEmailSender = (): EmailSender => {
  class EmailSenderStub implements EmailSender {
    async send(message: EmailSenderParams): Promise<boolean> {
      return true;
    }
  }

  return new EmailSenderStub();
};

interface SutTypes {
  sut: GetEmailController;
  emailValidatorStub: EmailValidator;
  emailSenderStub: EmailSender;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const emailSenderStub = makeEmailSender();
  const sut = new GetEmailController(emailValidatorStub, emailSenderStub);

  return { sut, emailValidatorStub, emailSenderStub };
};

describe('Get Email from Client', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no subject is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('subject'));
  });

  test('Should return 400 if no message is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        subject: 'any_subject',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('message'));
  });

  test('Should return 400 if invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const emailSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    sut.handle(httpRequest);
    expect(emailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        subject: 'any_subject',
        email: 'any_email@mail.com',
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 500 if EmailSender throws', () => {
    const { sut, emailSenderStub } = makeSut();
    jest.spyOn(emailSenderStub, 'send').mockImplementation(() => {
      throw Error();
    });
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call EmailSender with correct params', () => {
    const { sut, emailSenderStub } = makeSut();
    const emailSendSpy = jest.spyOn(emailSenderStub, 'send');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    sut.handle(httpRequest);
    expect(emailSendSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      subject: 'any_subject',
      message: 'any_message',
    });
  });

  test('Should return 200 if correct params are provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        subject: 'any_subject',
        email: 'any_email@mail.com',
        message: 'any_message',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(new Success());
  });
});
