// pages/api/veiculos/[id]/edit.ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nome, placa } = req.body;

    try {
      const updatedVehicle = await prisma.veiculo.update({
        where: { id: String(id) },
        data: {
          nome,
          placa,
        },
      });

      res.status(200).json(updatedVehicle);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit vehicle' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
