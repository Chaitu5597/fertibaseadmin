import React, { useState, useEffect, useMemo } from "react";
import { Plus, Search, Filter, Sun, Loader2, AlertCircle } from "lucide-react";
import { TestimonialCard } from "../components/TestimonialCard";
import { TestimonialModal } from "../components/TestimonialModal";
import * as testimonialService from "../services/testimonialService";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [viewing, setViewing] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterPlatform, setFilterPlatform] = useState("All");
    const [filterSeason, setFilterSeason] = useState("All");

    const initialFormState = {
        id: "",
        videoUrl: "",
        imageSrc: "",
        title: "",
        name: "",
        area: "",
        platform: "youtube",
        season: "",
        date: new Date().toISOString().split('T')[0],
    };

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const data = await testimonialService.getTestimonials();
            setTestimonials(data);
            setError(null);
        } catch (err) {
            setError("Failed to load testimonials.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm(initialFormState);
        setEditing(false);
        setViewing(false);
    };

    const handleAdd = () => {
        resetForm();
        setModalOpen(true);
    };

    const handleEdit = (testimonial) => {
        setForm(testimonial);
        setEditing(true);
        setViewing(false);
        setModalOpen(true);
    };

    const handleView = (testimonial) => {
        setForm(testimonial);
        setViewing(true);
        setEditing(false);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await testimonialService.deleteTestimonial(id);
            setTestimonials(prev => prev.filter((t) => t.id !== id));
        } catch (err) {
            alert("Failed to delete testimonial");
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (viewing) return;

        setActionLoading(true);
        try {
            if (editing) {
                const { id: _id, _id: __id, __v: ___v, createdAt: _createdAt, updatedAt: _updatedAt, ...testimonialData } = form;
                const updated = await testimonialService.updateTestimonial(form.id, testimonialData);
                setTestimonials(prev => prev.map((t) => (t.id === form.id ? updated : t)));
            } else {
                const { id: _id, _id: __id, __v: ___v, createdAt: _createdAt, updatedAt: _updatedAt, ...testimonialData } = form;
                const created = await testimonialService.createTestimonial(testimonialData);
                setTestimonials(prev => [created, ...prev]);
            }
            setModalOpen(false);
            resetForm();
        } catch (err) {
            alert("Failed to save testimonial: " + (err.message || "Please check all required fields"));
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleFile = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setForm(prev => ({ ...prev, [key]: reader.result }));
        reader.readAsDataURL(file);
    };

    const filteredTestimonials = useMemo(() => {
        return testimonials.filter(t => {
            const matchesSearch =
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.area.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPlatform = filterPlatform === "All" || t.platform.toLowerCase() === filterPlatform.toLowerCase();
            const matchesSeason = filterSeason === "All" || t.season?.toLowerCase() === filterSeason.toLowerCase();

            return matchesSearch && matchesPlatform && matchesSeason;
        });
    }, [testimonials, searchTerm, filterPlatform, filterSeason]);

    const uniqueSeasons = useMemo(() => {
        const fromData = [...new Set(testimonials.map(t => t.season).filter(Boolean))];
        const base = ["Kharif", "Rabi"];
        return ["All", ...new Set([...base, ...fromData])];
    }, [testimonials]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-emerald-600">
                <Loader2 size={40} className="animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 gap-4">
                <AlertCircle size={48} />
                <p className="text-lg font-medium">{error}</p>
                <button
                    onClick={fetchTestimonials}
                    className="px-4 py-2 bg-white border border-red-200 rounded-lg shadow-sm hover:bg-red-50 text-sm font-semibold text-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 font-sans text-slate-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Testimonials</h1>
                    <p className="text-slate-500 mt-2 text-sm font-medium">Manage and view customer testimonials</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 w-full md:w-auto justify-center"
                >
                    <Plus size={20} /> Add Testimonial
                </button>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-2 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 size-5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, name, or area..."
                        className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none text-slate-700 placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto p-1">
                    <div className="relative w-full sm:w-auto">
                        <Filter className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-400" size={16} />
                        <select
                            className="w-full sm:w-40 pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white appearance-none cursor-pointer"
                            value={filterPlatform}
                            onChange={(e) => setFilterPlatform(e.target.value)}
                        >
                            <option value="All">All Platforms</option>
                            <option value="youtube">YouTube</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="twitter">Twitter</option>
                        </select>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Sun className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-400" size={16} />
                        <select
                            className="w-full sm:w-40 pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white appearance-none cursor-pointer"
                            value={filterSeason}
                            onChange={(e) => setFilterSeason(e.target.value)}
                        >
                            {uniqueSeasons.map(s => (
                                <option key={s} value={s}>{s === "All" ? "All Seasons" : s}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.length > 0 ? (
                    filteredTestimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                        <Search size={48} className="text-gray-200 mb-4" />
                        <p className="text-lg font-medium">No testimonials found</p>
                        <p className="text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <TestimonialModal
                isOpen={modalOpen}
                isViewMode={viewing}
                isEditing={editing}
                form={form}
                setForm={setForm}
                onClose={() => { setModalOpen(false); resetForm(); }}
                onSubmit={handleSubmit}
                onFileChange={handleFile}
                isLoading={actionLoading}
            />
        </div>
    );
}
