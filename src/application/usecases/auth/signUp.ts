// src/application/usecases/auth/signUp.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface SignUpRequest {
  nome: string;
  email: string;
  senha: string;
}

interface SignUpResponse {
  user: {
    id: number;
    email: string;
    nome: string;
    sobrenome: string;
  };
}

export const signUp = async ({
  nome,
  email,
  senha,
}: SignUpRequest): Promise<SignUpResponse> => {
  // Verificar se o e-mail já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email já cadastrado!');
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Criar o novo usuário
  const user = await prisma.user.create({
    data: {
      nome,
      email,
      senha: hashedPassword,
    },
  });

  return { user };
};
