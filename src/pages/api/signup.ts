import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../../prisma/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const hashedPassword = await hash(senha, 10);

      const user = await prisma.user.create({
        data: {
          name: nome,
          email,
          password: hashedPassword,
        },
      });

      return res
        .status(201)
        .json({ message: 'Usuário criado com sucesso', user });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
