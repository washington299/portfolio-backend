import { EmailHandlerController } from '../../presentation/controller/email-handler/email-handler';
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter';
import { EmailSenderAdapter } from '../../presentation/services/email-sender';

export const makeEmailHandlerController = (): EmailHandlerController => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const emailSenderAdapter = new EmailSenderAdapter();
  return new EmailHandlerController(emailValidatorAdapter, emailSenderAdapter);
};
