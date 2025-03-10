import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateBarang() {
  const [barangNama, setBarangNama] = useState("");
  const [hargaBeli, setHargaBeli] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [transaksi, setTransaksi] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    formData.append("barang_nama", barangNama);
    formData.append("harga_beli", hargaBeli);
    formData.append("harga_jual", hargaJual);
    formData.append("transaksi", transaksi);

    fetch("http://localhost/PWL_POS/public/api/barangs", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          setErrorMessage(data.message);
        } else {
          alert("Barang berhasil dibuat!");
          setBarangNama("");
          setHargaBeli("");
          setHargaJual("");
          setTransaksi(null);
          navigate("/"); 
        }
      })
      .catch((error) => {
        console.error("Error creating barang:", error);
        setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
      <div className="w-full max-w-md flex items-center mb-6">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 ml-20">Masukkan Data Barang</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded p-6 w-full max-w-md"
      >
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="barangNama">
            Barang Nama
          </label>
          <input
            type="text"
            id="barangNama"
            value={barangNama}
            onChange={(e) => setBarangNama(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="hargaBeli">
            Harga Beli
          </label>
          <input
            type="number"
            id="hargaBeli"
            value={hargaBeli}
            onChange={(e) => setHargaBeli(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="hargaJual">
            Harga Jual
          </label>
          <input
            type="number"
            id="hargaJual"
            value={hargaJual}
            onChange={(e) => setHargaJual(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="transaksi">
            Transaksi (File Upload)
          </label>
          <input
            type="file"
            id="transaksi"
            onChange={(e) => setTransaksi(e.target.files[0])}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateBarang;
