import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function DetailBarang() {
  const { id } = useParams();
  const [barang, setBarang] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/PWL_POS/public/api/barangs/${id}`)
      .then((response) => response.json())
      .then((data) => setBarang(data))
      .catch((error) => console.error("Error fetching barang details:", error));
  }, [id]);

  if (!barang) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
        <div className="w-full max-w-md flex items-center mb-6">
            <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 ml-5 rounded hover:bg-blue-600"
            >
            Kembali
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 ml-10">Detail Barang</h1>
        </div>
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
            <img
            className="w-80 h-80 object-cover"
            src={barang.transaksi}
            alt={barang.barang_nama}
            />
            <div className="p-6 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                {barang.barang_nama}
            </h1>
            <p className="text-gray-700 text-base mb-2">
                <span className="font-medium">Harga Beli:</span> {barang.harga_beli}
            </p>
            <p className="text-gray-700 text-base">
                <span className="font-medium">Harga Jual:</span> {barang.harga_jual}
            </p>
            </div>
        </div>
        </div>
  );
}

export default DetailBarang;
