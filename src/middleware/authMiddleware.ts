// src/middlewares/authMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Defina a interface para o tipo de usuário no 'req.user'
interface UserPayload {
  id: number;
  email: string;
  nome: string;
  sobrenome: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token not provided');
  }

  try {
    // Decodifica o token e garante que o tipo seja de um JwtPayload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload &
      UserPayload;

    // Agora TypeScript sabe que decoded tem as propriedades id, email, nome, sobrenome
    req.user = decoded; // Atribuindo ao req.user o valor esperado

    next();
  } catch {
    return res.status(401).send('Invalid token');
  }
};
