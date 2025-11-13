


import { useState, useMemo } from "react";
import { Trash2, Plus, Eye, Pencil, Search } from "lucide-react";

export default function ProductManager() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "NITROBASE (Azospirillum)",
      category: "Nitrogen-Fixing Biofertilizers",
      dosage: ["1 liter per acre"],
      application: ["Foliar spray", "Soil application"],
      crops: ["Rice", "Wheat"],
      desc: "Improves nitrogen uptake and plant growth.",
      image: "",
      video: "",
    },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    dosage: [""],
    application: [""],
    crops: [""],
    desc: "",
    image: "",
    video: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 5);

  const resetForm = () => {
    setForm({
      id: "", name: "", category: "", dosage: [""], application: [""],
      crops: [""], desc: "", image: "", video: "",
    });
    setEditing(false);
    setViewing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const safeForm = {
      ...form,
      dosage: form.dosage.filter(d => d.trim()),
      application: form.application.filter(a => a.trim()),
      crops: form.crops.filter(c => c.trim()),
      image: form.image || "",
      video: form.video || "",
    };
    if (!editing) {
      setProducts([...products, { ...safeForm, id: generateId() }]);
    } else {
      setProducts(products.map(p => p.id === safeForm.id ? safeForm : p));
    }
    setModalOpen(false);
    resetForm();
  };

  const handleDelete = (id) => setProducts(products.filter(p => p.id !== id));
  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
    setModalOpen(true);
  };
  const handleView = (product) => {
    setForm(product);
    setViewing(true);
    setModalOpen(true);
  };

  const handleAddField = (key) => setForm({ ...form, [key]: [...form[key], ""] });
  const handleChangeField = (key, index, value) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, [key]: reader.result });
    reader.readAsDataURL(file);
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.dosage.some(d => d.toLowerCase().includes(term)) ||
      p.application.some(a => a.toLowerCase().includes(term))
    );
  }, [searchTerm, products]);

  return (
    <div className="p-6">
      {/* === HEADER WITH SEARCH & ADD === */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">List of Products</h1>
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center w-full md:w-auto">
          
          {/* SEARCH BAR */}
          <div className="relative w-full md:w-96">
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* ADD BUTTON */}
          <button
            className="bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 flex items-center justify-center gap-2 transition-shadow shadow-md hover:shadow-lg"
            onClick={() => {
              resetForm();
              setModalOpen(true);
            }}
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* === TABLE === */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-left text-gray-700 table-auto">
          <thead className="bg-gray-300 uppercase text-lg text-gray-600">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-mono text-xs">{p.id}</td>
                <td className="py-3 px-4 font-medium">{p.name}</td>
                <td className="py-3 px-4">{p.category}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleView(p)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition">
                      <Eye size={20} />
                    </button>
                    <button onClick={() => handleEdit(p)} className="text-amber-600 hover:bg-amber-100 p-2 rounded-full transition">
                      <Pencil size={20} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:bg-red-100 p-2 rounded-full transition">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === MODAL (unchanged below) === */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => { setModalOpen(false); resetForm(); }}
            >×</button>

            {/* Image Preview */}
            {form.image ? (
              <div className="flex justify-center p-4 bg-gray-50">
                <img src={form.image} alt={form.name} className="max-w-md h-64 object-contain rounded-lg border" />
              </div>
            ) : (
              <div className="h-52 bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {viewing ? (
              /* View Mode */
              <div className="p-16 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">{form.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><span className="text-gray-500 text-sm uppercase">Category</span><p className="font-medium">{form.category}</p></div>
                  <div><span className="text-gray-500 text-sm uppercase">Dosage</span><p className="font-medium">{form.dosage.join(", ")}</p></div>
                  <div><span className="text-gray-500 text-sm uppercase">Application</span><p className="font-medium">{form.application.join(", ")}</p></div>
                  <div><span className="text-gray-500 text-sm uppercase">Crops</span><p className="font-medium">{form.crops.join(", ")}</p></div>
                </div>
                <div>
                  <span className="text-gray-500 text-sm uppercase font-semibold">Description</span>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border mt-1">{form.desc || "No description."}</p>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Product Name</label>
                    <input type="text" className="w-full border p-2 rounded-md" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <input type="text" className="w-full border p-2 rounded-md" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
                  </div>
                </div>

                {["dosage", "application", "crops"].map(key => (
                  <div key={key}>
                    <label className="block font-semibold capitalize">{key}</label>
                    {form[key].map((v, i) => (
                      <div key={i} className="flex gap-2 mt-1">
                        <input type="text" className="flex-1 border p-2 rounded-md" value={v} onChange={e => handleChangeField(key, i, e.target.value)} required />
                        <button type="button" onClick={() => setForm({...form, [key]: form[key].filter((_, idx) => idx !== i)})} className="text-red-600 hover:text-red-800">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => handleAddField(key)} className="text-blue-600 text-sm mt-1">+ Add {key}</button>
                  </div>
                ))}

                <div>
                  <label className="block font-semibold">Description</label>
                  <textarea className="w-full border p-2 rounded-md" rows={3} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold">Image</label>
                    <input type="file" accept="image/*" className="mt-1" onChange={e => handleFile(e, "image")} />
                    {form.image && <img src={form.image} alt="prev" className="mt-2 w-32 h-32 object-cover rounded border" />}
                  </div>
                  <div>
                    <label className="block font-semibold">Video</label>
                    <input type="file" accept="video/*" className="mt-1" onChange={e => handleFile(e, "video")} />
                    {form.video && <video src={form.video} controls className="mt-2 w-48 h-32 rounded border" />}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                    {editing ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





