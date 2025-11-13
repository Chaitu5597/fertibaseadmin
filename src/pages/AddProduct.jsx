import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    dosage: [""],
    application: [""],
    crops: [""],
    desc: "",
    image: "",
  });

  const handleAddField = (key) => {
    setForm({ ...form, [key]: [...form[key], ""] });
  };

  const handleChange = (key, index, value) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        className="border rounded-md w-full p-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="text"
        placeholder="Category"
        className="border rounded-md w-full p-2"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      {/* Dynamic Fields */}
      {["dosage", "application", "crops"].map((key) => (
        <div key={key}>
          <label className="font-semibold capitalize">{key}</label>
          {form[key].map((v, i) => (
            <input
              key={i}
              value={v}
              placeholder={`${key} ${i + 1}`}
              onChange={(e) => handleChange(key, i, e.target.value)}
              className="border rounded-md w-full p-2 mt-1"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField(key)}
            className="text-blue-600 text-sm mt-2"
          >
            + Add another {key}
          </button>
        </div>
      ))}

      <textarea
        placeholder="Description"
        className="border rounded-md w-full p-2"
        value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />

      <div>
        <label className="font-semibold">Image</label>
        <input type="file" accept="image/*" onChange={handleImage} className="mt-2" />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded border"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Save Product
      </button>
    </form>
  );
}
