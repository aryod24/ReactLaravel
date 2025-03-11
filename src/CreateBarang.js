import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function InputField({ label, type, id, value, onChange, required = true }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={type === "file" ? undefined : value} // Files don't need a value
        onChange={onChange}
        className="p-2 border border-gray-300 rounded w-full"
        required={required}
      />
    </div>
  );
}

function CreateBarang() {
  const [formData, setFormData] = useState({
    barangNama: "",
    hargaBeli: "",
    hargaJual: "",
    transaksi: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const inputFields = [
    { label: "Barang Nama", type: "text", id: "barangNama" },
    { label: "Harga Beli", type: "number", id: "hargaBeli" },
    { label: "Harga Jual", type: "number", id: "hargaJual" },
    { label: "Transaksi (File Upload)", type: "file", id: "transaksi" },
  ];

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const payload = new FormData();
    payload.append("barang_nama", formData.barangNama);
    payload.append("harga_beli", formData.hargaBeli);
    payload.append("harga_jual", formData.hargaJual);
    payload.append("transaksi", formData.transaksi);

    fetch("http://localhost/PWL_POS/public/api/barangs", {
      method: "POST",
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          setErrorMessage(data.message);
        } else {
          alert("Barang berhasil dibuat!");
          setFormData({ barangNama: "", hargaBeli: "", hargaJual: "", transaksi: null });
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

        {inputFields.map(({ label, type, id }) => (
          <InputField
            key={id}
            label={label}
            type={type}
            id={id}
            value={formData[id] || ""}
            onChange={handleInputChange}
          />
        ))}

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
