import Image from 'next/image';
import { useEffect, useState } from 'react';

// Define Veiculo type
interface Veiculo {
  id: string;
  nome: string;
  placa: string;
  status: string;
}

interface CardInfoData {
  total: number;
  ativos: number;
  inativos: number;
}

interface CardInfoProps {
  vehicles: Veiculo[];
}

const CardInfo: React.FC<CardInfoProps> = ({ vehicles }) => {
  const [data, setData] = useState<CardInfoData | null>(null);

  useEffect(() => {
    const calculateData = () => {
      const total = vehicles.length;
      const ativos = vehicles.filter(
        (vehicle) => vehicle.status === 'ativo',
      ).length;
      const inativos = vehicles.filter(
        (vehicle) => vehicle.status === 'inativo',
      ).length;

      setData({ total, ativos, inativos });
    };

    // Call the calculation function whenever the vehicles list changes
    calculateData();
  }, [vehicles]);

  // If data is still loading or not available, show a loading message
  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Total Card */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center">
        <Image
          src="/images/total.svg"
          alt="total"
          width={65}
          height={65}
          className="relative grid justify-center items-center mx-2"
        />
        <div>
          <h3 className="text-base mb-2 text-gray-400">Total</h3>
          <p className="text-4xl font-bold text-gray-800">{data.total}</p>
        </div>
      </div>

      {/* Active Card */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center">
        <Image
          src="/images/check.svg"
          alt="ativos"
          width={65}
          height={65}
          className="relative grid justify-center items-center mx-2"
        />
        <div>
          <h3 className="text-base mb-2 text-gray-400">Ativos</h3>
          <p className="text-4xl font-bold text-gray-800">{data.ativos}</p>
        </div>
      </div>

      {/* Inactive Card */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center">
        <Image
          src="/images/inativos.svg"
          alt="Inativos"
          width={65}
          height={65}
          className="relative grid justify-center items-center mx-2"
        />
        <div>
          <h3 className="text-base mb-2 text-gray-400">Inativos</h3>
          <p className="text-4xl font-bold text-gray-800">{data.inativos}</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
