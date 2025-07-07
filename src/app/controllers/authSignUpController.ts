// src/api/controllers/authSignUpController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from '../../application/usecases/auth/signUp';

interface SignUpResponse {
  user: {
    id: number;
    email: string;
    nome: string;
    sobrenome: string;
  };
}

export const signUpController = async (
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse | { error: string }>,
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ error: 'Nome, email e senha são obrigatórios.' });
      }

      const { user } = await signUp({ nome, email, senha });

      return res.status(201).json({ user });
    } catch (error: unknown) {
      // Use `unknown` instead of `any`
      console.error(error);

      // Type guard to narrow down error type
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: error.message || 'Erro interno do servidor.' });
      }

      // If error is not an instance of Error, return generic message
      return res.status(500).json({ error: 'Erro inesperado.' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
};
