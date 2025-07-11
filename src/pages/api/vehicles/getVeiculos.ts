import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const veiculos = await prisma.veiculo.findMany();
      res.status(200).json(veiculos);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
