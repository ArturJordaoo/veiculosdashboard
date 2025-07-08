// src/pages/api/vehicles/[id]/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Rota para editar o veículo (PUT)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { nome, placa, status } = await req.json();

  try {
    const updatedVeiculo = await prisma.veiculo.update({
      where: { id },
      data: { nome, placa, status },
    });

    return NextResponse.json({
      message: 'Veículo atualizado com sucesso!',
      veiculo: updatedVeiculo,
    });
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar veículo' },
      { status: 500 },
    );
  }
}

// Rota para excluir o veículo (DELETE)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    // Excluir o veículo do banco de dados
    await prisma.veiculo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Veículo excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    return NextResponse.json(
      { message: 'Erro ao excluir veículo' },
      { status: 500 },
    );
  }
}
