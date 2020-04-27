import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeEmailHandlerController } from '../factories/email-handler';

export default (router: Router): void => {
  router.post('/send-email', adaptRoute(makeEmailHandlerController()));
};
