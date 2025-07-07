import Image from 'next/image';
export default function CardInfo() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center">
        <Image
          src="/images/total.svg"
          alt="total"
          width={65}
          height={65}
          className="relative grid justify-center items-center mx-2"
        />

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">total</h3>
          <p className="text-xl font-bold text-gray-800">350</p>
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
          <p className="text-xl font-bold ">365</p>
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
          <p className="text-xl font-bold ">26</p>
        </div>
      </div>
    </div>
  );
}
