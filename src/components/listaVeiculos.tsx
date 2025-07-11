/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'; // Assuming you are using your Dialog component
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Veiculo {
  id: string;
  nome: string;
  placa: string;
  status: string;
}

export default function VeiculosList({
  vehicles,
  fetchVehicles,
}: {
  vehicles: Veiculo[];
  fetchVehicles: () => void;
}) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Veiculo | null>(null);
  const [vehicleName, setVehicleName] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');

  useEffect(() => {
    async function fetchVeiculos() {
      const response = await fetch('/api/vehicles/getVeiculos');
      const data = await response.json();
      setVeiculos(data);
      setLoading(false);
    }

    fetchVeiculos();
  }, [vehicles]);

  // Function to handle Delete
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/vehicles/${id}/delVeiculo`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id));
      } else {
        alert('Não foi possível deletar');
      }
    } catch (error) {
      alert('Erro no processo de deletar');
    }
  };

  // Function to handle Change Status (Inativo)
  const handleInactivate = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ativo' ? 'inativo' : 'ativo';

    try {
      const response = await fetch(`/api/vehicles/${id}/statusVeiculo`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedVehicle = await response.json();
        setVeiculos((prevVeiculos) =>
          prevVeiculos.map((veiculo) =>
            veiculo.id === id ? updatedVehicle : veiculo,
          ),
        );
      } else {
        alert('Falha ao trocar status');
      }
    } catch (error) {
      alert('Falha no Processo de trocar status');
    }
  };

  // Function to handle Edit and open the modal
  const handleEdit = (veiculo: Veiculo) => {
    setEditVehicle(veiculo);
    setVehicleName(veiculo.nome);
    setVehiclePlate(veiculo.placa);
    setIsModalOpen(true);
  };

  const handleSubmitEdit = async () => {
    if (!editVehicle) return;

    const updatedData = {
      nome: vehicleName,
      placa: vehiclePlate,
    };

    try {
      const response = await fetch(
        `/api/vehicles/${editVehicle.id}/editVeiculo`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (response.ok) {
        const updatedVehicle = await response.json();
        setVeiculos((prevVeiculos) =>
          prevVeiculos.map((veiculo) =>
            veiculo.id === updatedVehicle.id ? updatedVehicle : veiculo,
          ),
        );
        setIsModalOpen(false); // Close the modal
      } else {
        alert('Falha ao Editar Veículo');
      }
    } catch (error) {
      alert('Erro no Processo');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6 rounded-lg flex">
      <div className="flex w-full">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Veículo
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Placa
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo) => (
              <tr
                key={veiculo.id}
                className={veiculo.status === 'inativo' ? 'bg-red-50' : ''}
              >
                <td className="px-4 py-2">{veiculo.nome}</td>
                <td className="px-4 py-2">{veiculo.placa}</td>
                <td className="px-4 py-2">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${
                      veiculo.status === 'ativo' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <span className="ml-2">{veiculo.status}</span>
                </td>
                <td className="px-4 py-2 flex justify-end gap-4">
                  {/* Botão de Editar */}
                  <button
                    onClick={() => handleEdit(veiculo)}
                    className="text-blue-500"
                  >
                    <Image
                      src="/images/edit.svg"
                      alt="edit"
                      width={38}
                      height={38}
                    />
                  </button>

                  {/* Botão de Inativar */}
                  <button
                    onClick={() => handleInactivate(veiculo.id, veiculo.status)}
                    className="text-yellow-500 cursor-pointer"
                  >
                    <Image
                      src="/images/archive.svg"
                      alt="archive"
                      width={38}
                      height={38}
                    />
                  </button>

                  {/* Botão de Excluir */}
                  <button
                    onClick={() => handleDelete(veiculo.id)}
                    className="text-red-500 cursor-pointer"
                  >
                    <Image
                      src="/images/bin.svg"
                      alt="delete"
                      width={38}
                      height={38}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing vehicle */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>Editar Veículo</DialogTitle>
          <DialogDescription>
            Edit the details of the vehicle.
          </DialogDescription>

          <div>
            <label className="block">Nome do Veículo</label>
            <input
              type="text"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block">Placa do Veículo</label>
            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <DialogClose
              type="button"
              className="bg-gray-400 text-white py-2 px-4 rounded cursor-pointer"
            >
              Cancelar
            </DialogClose>
            <button
              onClick={handleSubmitEdit}
              className="bg-blue-600 text-white py-2 px-6 rounded cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
