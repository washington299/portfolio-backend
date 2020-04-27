import { GetEmailController } from './get-email';
import {
  MissingParamError, InvalidParamError,
} from '../../response-handler';
import {
  EmailSender, EmailSenderParams, EmailValidator, HttpRequest,
} from '../../protocols';
import { ok, serverError, badRequest } from '../../helpers/http-helpers';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    subject: 'any_subject',
    message: 'any_message',
  },
});

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
      return new Promise((resolve) => resolve(true));
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
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no subject is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        message: 'any_message',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('subject')));
  });

  test('Should return 400 if no message is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        subject: 'any_subject',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('message')));
  });

  test('Should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const emailSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = makeFakeRequest();
    sut.handle(httpRequest);
    expect(emailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError());
  });

  test('Should return 500 if EmailSender returns false', async () => {
    const { sut, emailSenderStub } = makeSut();
    jest.spyOn(emailSenderStub, 'send').mockImplementation(async () => new Promise((resolve) => resolve(false)));
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        subject: 'any_subject',
        message: 'any_message',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError());
  });

  test('Should throw if EmailSender throws', async () => {
    const { sut, emailSenderStub } = makeSut();
    jest.spyOn(emailSenderStub, 'send').mockImplementation(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError());
  });

  test('Should call EmailSender with correct params', () => {
    const { sut, emailSenderStub } = makeSut();
    const emailSendSpy = jest.spyOn(emailSenderStub, 'send');
    const httpRequest = makeFakeRequest();
    sut.handle(httpRequest);
    expect(emailSendSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      subject: 'any_subject',
      message: 'any_message',
    });
  });

  test('Should return 200 if correct params are provided', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok());
  });
});
