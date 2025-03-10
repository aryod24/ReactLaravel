import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{barang.barang_nama}</h1>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img
          className="w-full h-48 object-cover"
          src={barang.transaksi}
          alt={barang.barang_nama}
        />
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
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
