import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const { status } = req.body;

  if (req.method === 'PATCH') {
    try {
      const updatedVehicle = await prisma.veiculo.update({
        where: { id: String(id) },
        data: {
          status,
        },
      });
      res.status(200).json(updatedVehicle);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: 'Failed to update vehicle status' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
