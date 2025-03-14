import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateBarang from "./CreateBarang";
import DetailBarang from "./DetailBarang";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (searchQuery.trim() === "") {
          response = await fetch("http://localhost/PWL_POS/public/api/barangs");
          const data = await response.json();
          setProducts(data);
        } else {
          response = await fetch(
            `http://localhost/PWL_POS/public/api/barangs/barang/search?barang_nama=${searchQuery}`
          );
          const data = await response.json();
          if (data.success) {
            setProducts(data.barang);
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
        <Link
          to="/create"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Barang
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.barang_id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          >
            <Link to={`/detail/${product.barang_id}`}>
              <img
                className="w-full h-48 object-cover"
                src={product.transaksi}
                alt={product.barang_nama}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.barang_nama}</div>
                <p className="text-gray-700 text-base">
                  <span className="font-medium">Harga Beli:</span> {product.harga_beli}
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-medium">Harga Jual:</span> {product.harga_jual}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 mt-4">No products match your search.</p>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBarang />} />
        <Route path="/detail/:id" element={<DetailBarang />} />
      </Routes>
    </Router>
  );
}

export default App;
