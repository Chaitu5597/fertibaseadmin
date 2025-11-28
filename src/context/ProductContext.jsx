// src/context/ProductContext.jsx
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "NITROBASE (Azospirillum)",
      category: "Nitrogen-Fixing Biofertilizers",
      dosage: ["1 liter per acre"],
      application: ["Foliar spray", "Soil application"],
      crops: ["Rice", "Wheat"],
      desc: "Improves nitrogen uptake and plant growth.",
      image:
        "https://via.placeholder.com/100", // default placeholder
    },
  ]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
