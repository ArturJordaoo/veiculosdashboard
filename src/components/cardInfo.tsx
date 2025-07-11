import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CardInfoData {
  total: number;
  ativos: number;
  inativos: number;
}

export default function CardInfo() {
  const [data, setData] = useState<CardInfoData | null>(null);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/vehicles/veiculoData');
        if (response.ok) {
          const result = await response.json();
          setData(result); // Atualiza o estado com os dados recebidos
        } else {
          console.error('Erro ao buscar os dados');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição', error);
      }
    };

    fetchData(); // Chama a função para buscar os dados
  }, []);

  // Se os dados ainda não estiverem carregados, exibe um carregamento
  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center">
        <Image
          src="/images/total.svg"
          alt="total"
          width={65}
          height={65}
          className="relative grid justify-center items-center mx-2"
        />
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Total</h3>
          <p className="text-xl font-bold text-gray-800">{data.total}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center">
        <Image
          src="/images/check.svg"
          alt="ativos"
          width={65}
          height={65}
          className="relative grid justify-center items-center mx-2"
        />
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Ativos</h3>
          <p className="text-xl font-bold">{data.ativos}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center">
        <Image
          src="/images/inativos.svg"
          alt="Inativos"
          width={65}
          height={65}
          className="relative grid justify-center items-center mx-2"
        />
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Inativos</h3>
          <p className="text-xl font-bold">{data.inativos}</p>
        </div>
      </div>
    </div>
  );
}
