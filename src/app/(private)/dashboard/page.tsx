'use client';
import CardInfo from '@/components/cardInfo';
import Veiculos from '@/components/listaVeiculos';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VehicleFormData, vehicleSchema } from '../../../schema/veiculo';

const Layout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit = (data: VehicleFormData) => {
    console.log('Novo Veículo:', data);
    reset();
    setIsModalOpen(false);
  };

  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="w-full bg-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link href="/dashboard">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={157}
              height={44}
              className="relative grid justify-center items-center"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Image
            src="/images/userlogo.svg"
            alt="user"
            width={26}
            height={26}
            className="relative grid justify-center items-center mx-2"
          />
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-1/5 text-black p-6 border-r border-gray-200">
          <div className="text-xl font-light mb-6">Navegação</div>
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

        <div className="w-4/5 p-6">
          <div className="container mx-auto px-4 py-6">
            <header className="grid items-center py-4 px-6 rounded-lg mb-6">
              <div className="text-5xl font-normal text-[#2B3A4B]">
                Olá Ewerton,
              </div>
              <div className="flex text-2xl text-[#858C94]">
                Cadastre e gerencie seus veículos
              </div>
            </header>
            <CardInfo />
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
                  <DialogTitle>Cadastrar Novo Veículo</DialogTitle>
                  <DialogDescription>
                    Preencha as informações do veículo.
                  </DialogDescription>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block">Nome do Veículo</label>
                      <input
                        type="text"
                        {...register('vehicleName')}
                        className="w-full border p-2 rounded"
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
                        {...register('vehiclePlate')}
                        className="w-full border p-2 rounded text-uppercase"
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
            <Veiculos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
