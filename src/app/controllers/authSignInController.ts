// src/api/controllers/authSignInController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '../../application/usecases/auth/signIn';

interface SignInResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nome: string;
    sobrenome: string;
  };
}

export const signInController = async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResponse | { error: string }>,
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const { email, senha } = req.body;

      // Validation checks for email and password
      if (!email || !senha) {
        return res
          .status(400)
          .json({ error: 'Email e senha são obrigatórios.' });
      }

      // Try to sign in
      const { token, user } = await signIn({ email, senha });

      // If signIn fails, handle it (e.g., wrong credentials)
      if (!token || !user) {
        return res
          .status(401)
          .json({ error: 'Credenciais inválidas. Tente novamente.' });
      }

      return res.status(200).json({ token, user });
    } catch (error: unknown) {
      // Use `unknown` instead of `any`
      console.error(error);

      // Type guard to narrow down error type
      if (error instanceof Error) {
        if (error instanceof TypeError) {
          return res.status(400).json({
            error: 'Erro de tipo inesperado. Por favor, verifique os dados.',
          });
        } else if (error instanceof SyntaxError) {
          return res
            .status(400)
            .json({ error: 'Erro de sintaxe ao processar a solicitação.' });
        } else if (error.message.includes('validation')) {
          // Example: validation errors in signIn
          return res
            .status(422)
            .json({ error: 'Falha na validação dos dados fornecidos.' });
        }

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
