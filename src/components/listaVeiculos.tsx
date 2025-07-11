/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Veiculo {
  id: string;
  nome: string;
  placa: string;
  status: string;
}

export default function VeiculosList() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVeiculos() {
      const response = await fetch('/api/vehicles/getVeiculos');
      const data = await response.json();
      setVeiculos(data);
      setLoading(false);
    }

    fetchVeiculos();
  }, []);

  // Function to handle Delete
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/vehicles/${id}/delVeiculo`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id));
      } else {
        alert('Failed to delete vehicle');
      }
    } catch (error) {
      alert('Error while deleting vehicle');
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
        alert('Failed to change vehicle status');
      }
    } catch (error) {
      alert('Error while changing vehicle status');
    }
  };

  // Function to handle Edit
  const handleEdit = async (id: string, updatedData: any) => {
    try {
      const response = await fetch(`/api/veiculos/${id}/editVeiculo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedVehicle = await response.json();
        setVeiculos((prevVeiculos) =>
          prevVeiculos.map((veiculo) =>
            veiculo.id === id ? updatedVehicle : veiculo,
          ),
        );
      } else {
        alert('Failed to edit vehicle');
      }
    } catch (error) {
      alert('Error while editing vehicle');
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
                className={veiculo.status === 'inativo' ? 'bg-gray-100' : ''}
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
                  <Link
                    href={`/vehicles/edit/${veiculo.id}`}
                    className="text-blue-500"
                  >
                    <Image
                      src="/images/edit.svg"
                      alt="edit"
                      width={38}
                      height={38}
                    />
                  </Link>

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
    </div>
  );
}
