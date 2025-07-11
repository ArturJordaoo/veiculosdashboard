import prisma from '@/lib/prisma';

export default async function GetVeiculos() {
  const veiculos = await prisma.veiculo.findMany();

  return (
    <div>
      <ul>
        {veiculos.map((veiculo) => (
          <li key={veiculo.id}></li>
        ))}
      </ul>
    </div>
  );
}
