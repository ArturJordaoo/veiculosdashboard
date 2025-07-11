import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Consultar os dados necessários do banco
    const totalCount = await prisma.veiculo.count();
    const ativosCount = await prisma.veiculo.count({
      where: {
        status: 'ativo',
      },
    });
    const inativosCount = await prisma.veiculo.count({
      where: {
        status: 'inativo',
      },
    });

    // Retornar os dados como JSON
    res.status(200).json({
      total: totalCount,
      ativos: ativosCount,
      inativos: inativosCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
}
