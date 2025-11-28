import { useState, useMemo, useRef, useEffect } from "react";
import {
  Trash2, Plus, Eye, Pencil, Search, X, ChevronRight, Upload, Video,
  Image as ImageIcon, Save, ArrowLeft, Check, HelpCircle, List, Table as TableIcon,
  MoreVertical, Filter, Download, ChevronDown, Leaf, Droplets, Sprout, Sun, AlertCircle, Loader2
} from "lucide-react";
import { Editor } from '@tinymce/tinymce-react';
import * as productService from '../services/productService';

export default function ProductManager() {
  const editorRef = useRef(null);

  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const initialFormState = {
    id: "",
    name: "",
    category: "",
    status: "Active",
    price: "",
    stock: "In Stock",
    metaTitle: "",
    metaKeywords: "",
    overview: "",
    whatIs: "",
    howItWorks: "",
    whyChoose: "",
    benefits: [],
    dosage: [],
    crops: [],
    techInfo: [],
    packSizes: [],
    faqs: [],
    image: "",
    video: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  // --- FETCH PRODUCTS ON MOUNT ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      // Normalize _id to id if needed
      const normalizedData = Array.isArray(data) ? data.map(p => ({ ...p, id: p._id || p.id })) : [];
      setProducts(normalizedData);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialFormState);
    setEditing(false);
    setViewing(false);
    setActiveTab("basic");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const safeForm = { ...form };
      // Ensure we send the correct ID if it exists
      const productId = safeForm.id || safeForm._id;

      if (!editing) {
        const newProduct = await productService.createProduct(safeForm);
        // Normalize response
        const normalizedProduct = { ...newProduct, id: newProduct._id || newProduct.id };
        setProducts([...products, normalizedProduct]);
      } else {
        const updatedProduct = await productService.updateProduct(productId, safeForm);
        // Normalize response
        const normalizedProduct = { ...updatedProduct, id: updatedProduct._id || updatedProduct.id };
        setProducts(products.map(p => p.id === productId ? normalizedProduct : p));
      }
      setModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to save product: ' + err.message);
      console.error('Error saving product:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setActionLoading(true);
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
      console.error('Error deleting product:', err);
    } finally {
      setActionLoading(false);
    }
  };

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

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, [key]: reader.result });
    reader.readAsDataURL(file);
  };

  // --- HELPER FOR ARRAYS ---
  const addItem = (key, item) => setForm({ ...form, [key]: [...form[key], item] });
  const removeItem = (key, index) => setForm({ ...form, [key]: form[key].filter((_, i) => i !== index) });
  const updateItem = (key, index, field, value) => {
    const newArray = [...form[key]];
    if (typeof newArray[index] === 'object') {
      newArray[index] = { ...newArray[index], [field]: value };
    } else {
      newArray[index] = value;
    }
    setForm({ ...form, [key]: newArray });
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }, [searchTerm, products]);

  // --- TABS CONFIG ---
  const tabs = [
    { id: "basic", label: "Basic Info", icon: List },
    { id: "content", label: "Rich Content", icon: File },
    { id: "dosage", label: "Dosage & Crops", icon: TableIcon },
    { id: "tech", label: "Tech Specs", icon: Check },
    { id: "faq", label: "FAQs", icon: HelpCircle },
    { id: "seo", label: "SEO", icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 font-sans text-slate-800">

      {/* === HEADER === */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Products</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Manage your bio-fertilizer catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white text-slate-600 px-4 py-2.5 rounded-xl border border-slate-200 font-medium hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Download size={18} /> Export
          </button>
          <button
            onClick={() => { resetForm(); setModalOpen(true); }}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>
      </div>

      {/* === FILTERS & SEARCH === */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 size-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products by name, category..."
            className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none text-slate-700 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <button className="p-3 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* === PRODUCT TABLE === */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="py-5 px-6">Product</th>
                <th className="py-5 px-6">Category</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6">Pack Sizes</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <Leaf size={20} className="text-emerald-500/50" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {p.status || "Active"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {p.packSizes.slice(0, 2).map((size, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs text-slate-600 font-medium">
                          {size}
                        </span>
                      ))}
                      {p.packSizes.length > 2 && (
                        <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500">
                          +{p.packSizes.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleView(p)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEdit(p)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Product">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                <Search size={24} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No products found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your search or add a new product.</p>
            </div>
          )}
        </div>
      </div>

      {/* === MODAL === */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 lg:p-8">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-white/20">

            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {viewing ? "Product Details" : editing ? "Edit Product" : "New Product"}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {viewing ? "View complete product information" : "Fill in the details below to manage your product"}
                </p>
              </div>
              <button
                onClick={() => { setModalOpen(false); resetForm(); }}
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex overflow-hidden bg-slate-50/50">
              {/* Sidebar Tabs (Only for Edit/Add) */}
              {!viewing && (
                <div className="w-72 bg-white border-r border-slate-100 p-6 space-y-2 overflow-y-auto hidden lg:block">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Navigation</div>
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${activeTab === tab.id
                        ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <tab.icon size={18} className={activeTab === tab.id ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
                {viewing ? (
                  <ViewProduct product={form} />
                ) : (
                  <form id="product-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">

                    {/* BASIC INFO */}
                    {activeTab === "basic" && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><List size={18} /></div>
                            General Information
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700">Product Name <span className="text-red-500">*</span></label>
                              <input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" placeholder="e.g. Fertibase Nitrobase" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700">Category <span className="text-red-500">*</span></label>
                              <input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" placeholder="e.g. Biofertilizer" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Pack Sizes</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {form.packSizes.map((size, i) => (
                                <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 border border-emerald-100">
                                  {size} <button type="button" onClick={() => removeItem("packSizes", i)} className="hover:text-emerald-900"><X size={14} /></button>
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input type="text" id="packSizeInput" className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" placeholder="Add a size (e.g. 1 L) and press Enter" onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (e.target.value.trim()) { addItem("packSizes", e.target.value.trim()); e.target.value = ""; }
                                }
                              }} />
                              <button type="button" onClick={() => {
                                const input = document.getElementById("packSizeInput");
                                if (input.value.trim()) { addItem("packSizes", input.value.trim()); input.value = ""; }
                              }} className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Add</button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600"><ImageIcon size={18} /></div>
                            Media Assets
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <label className="text-sm font-semibold text-slate-700">Product Image</label>
                              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
                                <input type="file" accept="image/*" onChange={e => handleFile(e, "image")} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                {form.image ? (
                                  <div className="relative w-full h-48">
                                    <img src={form.image} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium rounded-lg">Change Image</div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                      <Upload size={20} className="text-slate-400" />
                                    </div>
                                    <span className="text-sm text-slate-600 font-medium">Click to upload image</span>
                                    <span className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <label className="text-sm font-semibold text-slate-700">Product Video</label>
                              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
                                <input type="file" accept="video/*" onChange={e => handleFile(e, "video")} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                {form.video ? (
                                  <div className="relative w-full h-48">
                                    <video src={form.video} className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium rounded-lg">Change Video</div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                      <Video size={20} className="text-slate-400" />
                                    </div>
                                    <span className="text-sm text-slate-600 font-medium">Click to upload video</span>
                                    <span className="text-xs text-slate-400 mt-1">MP4, WebM or Ogg</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CONTENT */}
                    {activeTab === "content" && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600"><File size={18} /></div>
                            Product Descriptions
                          </h3>
                          {["overview", "whatIs", "howItWorks", "whyChoose"].map((field) => (
                            <div key={field} className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                              <textarea
                                rows={4}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none resize-y"
                                value={form[field]}
                                onChange={e => setForm({ ...form, [field]: e.target.value })}
                                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><Sprout size={18} /></div>
                              Key Benefits
                            </h3>
                            <button type="button" onClick={() => addItem("benefits", { title: "", desc: "" })} className="text-emerald-600 text-sm font-semibold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                              <Plus size={16} /> Add Benefit
                            </button>
                          </div>
                          <div className="space-y-4">
                            {form.benefits.map((benefit, i) => (
                              <div key={i} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100 group">
                                <div className="flex-1 space-y-3">
                                  <input type="text" placeholder="Benefit Title" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium focus:border-emerald-500 outline-none" value={benefit.title} onChange={e => updateItem("benefits", i, "title", e.target.value)} />
                                  <textarea placeholder="Description" rows={2} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" value={benefit.desc} onChange={e => updateItem("benefits", i, "desc", e.target.value)} />
                                </div>
                                <button type="button" onClick={() => removeItem("benefits", i)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                              </div>
                            ))}
                            {form.benefits.length === 0 && (
                              <div className="text-center py-8 text-slate-400 italic bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                No benefits added yet.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DOSAGE & CROPS */}
                    {activeTab === "dosage" && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Droplets size={18} /></div>
                              Dosage & Application
                            </h3>
                            <button type="button" onClick={() => addItem("dosage", { method: "", dosage: "", timing: "", details: "" })} className="text-emerald-600 text-sm font-semibold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                              <Plus size={16} /> Add Row
                            </button>
                          </div>

                          <div className="space-y-4">
                            {form.dosage.map((row, i) => (
                              <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative group">
                                <button type="button" onClick={() => removeItem("dosage", i)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"><X size={16} /></button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Method</label>
                                    <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 outline-none" value={row.method} onChange={e => updateItem("dosage", i, "method", e.target.value)} />
                                  </div>
                                  <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Dosage</label>
                                    <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 outline-none" value={row.dosage} onChange={e => updateItem("dosage", i, "dosage", e.target.value)} />
                                  </div>
                                  <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Timing</label>
                                    <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 outline-none" value={row.timing} onChange={e => updateItem("dosage", i, "timing", e.target.value)} />
                                  </div>
                                  <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Details</label>
                                    <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 outline-none" value={row.details} onChange={e => updateItem("dosage", i, "details", e.target.value)} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600"><Sun size={18} /></div>
                            Suitable Crops
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {form.crops.map((crop, i) => (
                              <span key={i} className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 border border-yellow-100">
                                {crop} <button type="button" onClick={() => removeItem("crops", i)} className="hover:text-yellow-900"><X size={14} /></button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input type="text" id="cropInput" className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" placeholder="Add a crop (e.g. Paddy) and press Enter" onKeyDown={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (e.target.value.trim()) { addItem("crops", e.target.value.trim()); e.target.value = ""; }
                              }
                            }} />
                            <button type="button" onClick={() => {
                              const input = document.getElementById("cropInput");
                              if (input.value.trim()) { addItem("crops", input.value.trim()); input.value = ""; }
                            }} className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Add</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TECH SPECS */}
                    {activeTab === "tech" && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"><Check size={18} /></div>
                              Technical Specifications
                            </h3>
                            <button type="button" onClick={() => addItem("techInfo", { key: "", value: "" })} className="text-emerald-600 text-sm font-semibold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                              <Plus size={16} /> Add Spec
                            </button>
                          </div>

                          <div className="space-y-3">
                            {form.techInfo.map((info, i) => (
                              <div key={i} className="flex gap-4 items-center group">
                                <input type="text" placeholder="Key (e.g. Shelf Life)" className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-colors" value={info.key} onChange={e => updateItem("techInfo", i, "key", e.target.value)} />
                                <ArrowLeft size={16} className="text-slate-300" />
                                <input type="text" placeholder="Value (e.g. 12 Months)" className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-colors" value={info.value} onChange={e => updateItem("techInfo", i, "value", e.target.value)} />
                                <button type="button" onClick={() => removeItem("techInfo", i)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* FAQ */}
                    {activeTab === "faq" && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600"><HelpCircle size={18} /></div>
                              Frequently Asked Questions
                            </h3>
                            <button type="button" onClick={() => addItem("faqs", { question: "", answer: "" })} className="text-emerald-600 text-sm font-semibold hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                              <Plus size={16} /> Add FAQ
                            </button>
                          </div>

                          <div className="space-y-4">
                            {form.faqs.map((faq, i) => (
                              <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3 relative group">
                                <button type="button" onClick={() => removeItem("faqs", i)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                                <input type="text" placeholder="Question" className="w-full px-3 py-2 bg-transparent border-b border-slate-200 font-semibold text-slate-800 focus:border-emerald-500 outline-none placeholder:font-normal" value={faq.question} onChange={e => updateItem("faqs", i, "question", e.target.value)} />
                                <textarea placeholder="Answer" rows={2} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-emerald-500 outline-none" value={faq.answer} onChange={e => updateItem("faqs", i, "answer", e.target.value)} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SEO */}
                    {activeTab === "seo" && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600"><Search size={18} /></div>
                            Search Engine Optimization
                          </h3>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700">Meta Title</label>
                              <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} />
                              <p className="text-xs text-slate-500 flex justify-between">
                                <span>Recommended length: 50-60 characters</span>
                                <span className={form.metaTitle.length > 60 ? "text-red-500" : "text-emerald-600"}>{form.metaTitle.length} chars</span>
                              </p>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700">Meta Keywords</label>
                              <textarea rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" value={form.metaKeywords} onChange={e => setForm({ ...form, metaKeywords: e.target.value })} />
                              <p className="text-xs text-slate-500">Separate keywords with commas</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </form>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            {!viewing && (
              <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end gap-4 sticky bottom-0 z-10">
                <button onClick={() => { setModalOpen(false); resetForm(); }} className="px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" form="product-form" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 transform active:scale-95">
                  <Save size={18} /> {editing ? "Save Changes" : "Create Product"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- VIEW COMPONENT ---
function ViewProduct({ product }) {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-10">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="w-full lg:w-5/12 space-y-6">
          <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex items-center justify-center relative group">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
            ) : (
              <div className="text-slate-300 flex flex-col items-center">
                <Leaf size={64} className="mb-4 opacity-50" />
                <span className="text-sm font-medium">No Image Available</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">{product.category}</span>
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-600">{product.status || "Active"}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{product.name}</h1>
          </div>

          <div className="prose prose-lg text-slate-600 leading-relaxed">
            <p>{product.overview}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Available Packs</h3>
            <div className="flex flex-wrap gap-3">
              {product.packSizes.map((size, i) => (
                <span key={i} className="px-6 py-3 border-2 border-slate-200 rounded-xl text-slate-700 font-bold hover:border-emerald-500 hover:text-emerald-700 transition-colors cursor-default">{size}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <div className="text-sm text-slate-500 font-medium mb-1">Active Organisms</div>
              <div className="font-bold text-slate-900">Nitrogen-Fixing Bacteria</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <div className="text-sm text-slate-500 font-medium mb-1">Shelf Life</div>
              <div className="font-bold text-slate-900">12 Months</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
            <HelpCircle size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">What Is It?</h3>
          <p className="text-slate-600 leading-relaxed">{product.whatIs}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
            <Sprout size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">How It Works?</h3>
          <p className="text-slate-600 leading-relaxed">{product.howItWorks}</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-10 text-center">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.benefits.map((b, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                <h4 className="font-bold text-emerald-400 mb-3 text-lg">{b.title}</h4>
                <p className="text-slate-300 leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dosage Table */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Droplets className="text-blue-500" /> Dosage & Application
        </h3>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-900 font-bold text-sm uppercase tracking-wider">
              <tr>
                <th className="p-6">Method</th>
                <th className="p-6">Dosage</th>
                <th className="p-6">Timing</th>
                <th className="p-6">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {product.dosage.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">{row.method}</td>
                  <td className="p-6 text-slate-600 font-medium">{row.dosage}</td>
                  <td className="p-6 text-slate-600">{row.timing}</td>
                  <td className="p-6 text-slate-600 text-sm leading-relaxed">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tech Specs & FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Check className="text-indigo-500" /> Technical Specs
          </h3>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
            {product.techInfo.map((info, i) => (
              <div key={i} className="flex justify-between items-center p-5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <span className="text-slate-500 font-medium">{info.key}</span>
                <span className="font-bold text-slate-900 text-right">{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <HelpCircle className="text-pink-500" /> FAQs
          </h3>
          <div className="space-y-4">
            {product.faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-900 mb-2 text-lg">{faq.question}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy File icon since it was missing in imports
function File({ size, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}






















