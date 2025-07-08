'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Definindo tipos para Veículo
interface Veiculo {
  id: string;
  nome: string;
  placa: string;
  status: 'ativo' | 'inativo';
}

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]); // Especificando que o estado vai ser um array de veículos

  // Buscar os veículos ao carregar o componente
  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const res = await fetch('/api/vehicles');
        if (res.ok) {
          const data: { veiculos: Veiculo[] } = await res.json(); // Especificando o tipo da resposta da API
          setVeiculos(data.veiculos); // Armazena os veículos na state
        } else {
          console.error('Erro ao carregar veículos');
        }
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    fetchVeiculos();
  }, []); // A dependência vazia significa que só será executado uma vez após o primeiro render

  // Função para excluir veículo
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      // Após excluir, remove o veículo da lista localmente
      setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id));
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
    }
  };

  // Função para inativar veículo
  const handleInactivate = async (id: string) => {
    try {
      await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'inativo' }),
      });
      // Atualiza o status do veículo na lista local
      setVeiculos(
        veiculos.map((veiculo) =>
          veiculo.id === id ? { ...veiculo, status: 'inativo' } : veiculo,
        ),
      );
    } catch (error) {
      console.error('Erro ao inativar veículo:', error);
    }
  };

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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600"></th>
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
                    onClick={() => handleInactivate(veiculo.id)}
                    className="text-yellow-500"
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
                    className="text-red-500"
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
