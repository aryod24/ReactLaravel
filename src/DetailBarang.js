import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function DetailBarang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barang, setBarang] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    barang_nama: "",
    harga_beli: "",
    harga_jual: "",
  });

  useEffect(() => {
    fetch(`http://localhost/PWL_POS/public/api/barangs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBarang(data);
        setFormData({
          barang_nama: data.barang_nama,
          harga_beli: data.harga_beli,
          harga_jual: data.harga_jual,
        });
      })
      .catch((error) => console.error("Error fetching barang details:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost/PWL_POS/public/api/barangs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barang_nama: formData.barang_nama,
          harga_beli: formData.harga_beli,
          harga_jual: formData.harga_jual,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setBarang((prev) => ({
          ...prev,
          ...updatedData,
        }));
        setIsEditing(false);
        console.log("Update successful:", updatedData);
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating barang:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost/PWL_POS/public/api/barangs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Delete successful");
        navigate("/");
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting barang:", error);
    }
  };

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
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Nama Barang
            </label>
            <input
              type="text"
              name="barang_nama"
              value={formData.barang_nama}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Harga Beli
            </label>
            <input
              type="number"
              name="harga_beli"
              value={formData.harga_beli}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Harga Jual
            </label>
            <input
              type="number"
              name="harga_jual"
              value={formData.harga_jual}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default DetailBarang;
