import { Trash2, Eye, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function Products() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <Link
          to="/admin/add-product"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Dosage</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                </td>
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4">{p.category}</td>
                <td className="py-3 px-4">{p.dosage.join(", ")}</td>
                <td className="py-3 px-4 text-right space-x-3">
                  <button
                    onClick={() => navigate(`/admin/products/${p.id}`)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 inline-flex"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 inline-flex"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
