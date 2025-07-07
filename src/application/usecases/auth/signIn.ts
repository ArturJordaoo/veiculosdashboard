// src/application/usecases/auth/signIn.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

interface SignInRequest {
  email: string;
  senha: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nome: string;
    sobrenome: string;
  };
}

export const signIn = async ({
  email,
  senha,
}: SignInRequest): Promise<AuthResponse> => {
  // Verificar se o usuário existe
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Usuário não encontrado!');
  }

  // Verificar se a senha está correta
  const isPasswordValid = await bcrypt.compare(senha, user.senha);
  if (!isPasswordValid) {
    throw new Error('Senha incorreta!');
  }

  // Gerar o JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user };
};
