import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../prisma/generated/prisma';

const prisma = new PrismaClient();

export default async function GET() {
  try {
    const veiculos = await prisma.veiculo.findMany();
    return NextResponse.json({ veiculos });
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar veículos' },
      { status: 500 },
    );
  }
}
