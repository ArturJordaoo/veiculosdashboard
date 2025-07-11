import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { vehicleName, vehiclePlate } = req.body;

    try {
      const existingVehicle = await prisma.veiculo.findUnique({
        where: {
          placa: vehiclePlate,
        },
      });

      if (existingVehicle) {
        return res
          .status(400)
          .json({ error: 'Veículo com a mesma placa já existe!' });
      }

      const newVehicle = await prisma.veiculo.create({
        data: {
          nome: vehicleName,
          placa: vehiclePlate,
          status: 'ativo',
        },
      });

      res.status(201).json(newVehicle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Falha ao criar o veículo' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
