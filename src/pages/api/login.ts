import { NextApiRequest, NextApiResponse } from 'next'; // Importação corrigida
import { signInController } from '../../app/controllers/authSignInController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  return signInController(req, res);
}
