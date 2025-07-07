// src/types/express.d.ts
declare namespace Express {
  export interface Request {
    user?: { id: number; email: string; nome: string; sobrenome: string };
  }
}
