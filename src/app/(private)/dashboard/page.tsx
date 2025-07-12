'use client';
import CardInfo from '@/components/cardInfo';
import VeiculosList from '@/components/listaVeiculos';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Navbar from '@/components/ui/navbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VehicleFormData, vehicleSchema } from '../../../schema/veiculo';

interface Veiculo {
  id: string;
  nome: string;
  placa: string;
  status: string;
}

const Layout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Veiculo[]>([]);

  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !session) {
      router.push('/signin');
    }
  }, [isClient, session, router]);

  const onSubmit = async (data: VehicleFormData) => {
    try {
      const response = await fetch('/api/vehicles/createVeiculo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newVehicle = await response.json();

        reset();
        setIsModalOpen(false);
        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]); // Add the new vehicle
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro desconhecido');
      }
    } catch (error) {
      alert('Erro ao criar veículo');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const fetchVehicles = async () => {
    const response = await fetch('/api/vehicles/getVeiculos');
    const data = await response.json();
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const [activeTab, setActiveTab] = useState('dashboard');

  if (!session || !isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar userName={session?.user?.name ?? 'Usuário'} />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-1/5 text-black p-6 border-b sm:border-r sm:border-gray-200">
          <div className="text-xl font-light mb-6">Dashboard</div>{' '}
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left p-2 flex cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#EBEEF2] rounded-3xl text-blue-400'
                    : 'hover:bg-[#e2eaf5] rounded-4xl'
                }`}
              >
                <Image
                  src="/images/dashlogo.svg"
                  alt="dashlogo"
                  width={24}
                  height={24}
                  className="relative grid justify-center items-center mx-2"
                />
                <h3 className="text-base font-normal">Dashboard</h3>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('relatorios')}
                className={`w-full text-left p-2 flex cursor-pointer ${
                  activeTab === 'relatorios'
                    ? 'bg-[#EBEEF2] rounded-3xl'
                    : 'hover:bg-[#e2eaf5] rounded-4xl'
                }`}
              >
                <Image
                  src="/images/relatorios.svg"
                  alt="relatorios"
                  width={24}
                  height={24}
                  className="relative grid justify-center items-center mx-2"
                />
                <h3 className="text-base font-normal">Relatórios</h3>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-4/5 p-6">
          <div className="container mx-auto px-4 py-6">
            <header className="grid items-center py-4 px-6 rounded-lg mb-6">
              <div className="text-3xl sm:text-5xl font-normal text-[#2B3A4B]">
                Olá {getFirstName(session?.user?.name ?? 'Usuário')},
              </div>
              <div className="flex text-lg sm:text-2xl text-[#858C94]">
                Cadastre e gerencie seus veículos
              </div>
            </header>
            <CardInfo vehicles={vehicles} />{' '}
            <div className="p-6 rounded-lg mb-6">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white py-2 px-6 rounded-4xl hover:bg-blue-700 flex cursor-pointer"
                  >
                    <Image
                      src="/images/plus.svg"
                      alt="plus"
                      width={24}
                      height={24}
                      className="relative grid justify-center items-center mx-2"
                    />
                    Cadastrar Veículo
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle className="flex justify-center items-center">
                    <Image
                      src="/images/carrologo.svg"
                      alt="plus"
                      width={54}
                      height={54}
                      className="relative grid justify-center items-center mx-2"
                    />
                    Cadastrar Novo Veículo
                  </DialogTitle>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block">Nome do Veículo</label>
                      <input
                        type="text"
                        placeholder="Digite o nome do Veículo"
                        {...register('vehicleName')}
                        className="w-full border p-1 rounded"
                      />
                      {errors.vehicleName && (
                        <p className="text-red-500 text-sm">
                          {errors.vehicleName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block">Placa do Veículo</label>
                      <input
                        type="text"
                        placeholder="Digite o número da placa"
                        {...register('vehiclePlate')}
                        className="w-full border p-1 rounded text-uppercase"
                      />
                      {errors.vehiclePlate && (
                        <p className="text-red-500 text-sm">
                          {errors.vehiclePlate.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-4">
                      <DialogClose
                        type="button"
                        className="bg-gray-400 text-white py-2 px-4 rounded cursor-pointer"
                      >
                        Cancelar
                      </DialogClose>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded cursor-pointer"
                      >
                        Criar Veículo
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <VeiculosList vehicles={vehicles} fetchVehicles={fetchVehicles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
