import { Router, Request, Response } from 'express';

export default (router: Router): void => {
  router.post('/send-email', (req: Request, res: Response) => {
    res.json({ name: 'Washington' });
  });
};
