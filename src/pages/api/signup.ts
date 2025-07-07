import { NextApiRequest, NextApiResponse } from 'next';

import { signUpController } from '../../app/controllers/authSignUpController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  return signUpController(req, res);
}
