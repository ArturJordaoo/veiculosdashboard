import Image from 'next/image';

export default function Veiculos() {
  return (
    <div className="p-6 rounded-lg flex ">
      <div className="flex w-[100%]">
        <table className="min-w-full table-auto ">
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
            <tr className="border-b ">
              <td className="px-4 py-2">Fiat Strada</td>
              <td className="px-4 py-2">BRA2D19</td>
              <td className="px-4 py-2  ">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                <span className="ml-2 ">Ativo</span>
              </td>
              <td className="px-4 py-2 flex justify-end">
                <button className="text-blue-500 mr-2">
                  <Image
                    src="/images/edit.svg"
                    alt="edit"
                    width={38}
                    height={38}
                    className="relative grid justify-center items-center"
                  />
                </button>
                <button className="text-red-500">
                  <Image
                    src="/images/archive.svg"
                    alt="archive"
                    width={38}
                    height={38}
                    className="relative grid justify-center items-center"
                  />
                </button>
                <button className="text-red-500">
                  <Image
                    src="/images/bin.svg"
                    alt="delete"
                    width={38}
                    height={38}
                    className="relative grid justify-center items-center"
                  />
                </button>
              </td>
            </tr>
            {/* Exemplo para Status Inativo */}
            <tr className="border-b bg-[#fafafa]">
              <td className="px-4 py-2">Chevrolet Onix</td>
              <td className="px-4 py-2">XYZ3A56</td>
              <td className="px-4 py-2  ">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                <span className="ml-2">Inativo</span>
              </td>
              <td className="px-4 py-2 flex justify-end">
                <button className="text-blue-500 mr-2">
                  <Image
                    src="/images/edit.svg"
                    alt="edit"
                    width={38}
                    height={38}
                    className="relative grid justify-center items-center"
                  />
                </button>
                <button className="text-red-500">
                  <Image
                    src="/images/archive.svg"
                    alt="archive"
                    width={38}
                    height={38}
                    className="relative grid justify-center items-center"
                  />
                </button>
                <button className="text-red-500">
                  <Image
                    src="/images/bin.svg"
                    alt="delete"
                    width={38}
                    height={38}
                    className="relative grid justify-center items-center"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
