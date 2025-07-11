import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.veiculo.delete({
        where: { id: String(id) },
      });
      res.status(200).json({ message: 'Vehicle deleted successfully' });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete vehicle' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
