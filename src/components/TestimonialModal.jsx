// src/components/TestimonialModal.jsx
import React from 'react';
import { X, Save, Upload, Video } from "lucide-react";

export const TestimonialModal = ({
    isOpen,
    isViewMode,
    isEditing,
    form,
    setForm,
    onClose,
    onSubmit,
    onFileChange
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {isViewMode ? "Testimonial Details" : isEditing ? "Edit Testimonial" : "Add Testimonial"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {isViewMode ? "View testimonial information" : "Fill in the details below"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="testimonial-form" onSubmit={onSubmit} className="space-y-6">
                        {/* Image & Video Upload Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Product Image</label>
                                {!isViewMode ? (
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative group h-40">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => onFileChange(e, "imageSrc")}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                        {form.imageSrc ? (
                                            <img src={form.imageSrc} alt="Preview" className="h-full object-contain rounded-lg" />
                                        ) : (
                                            <>
                                                <Upload size={20} className="text-gray-400 mb-2" />
                                                <span className="text-xs text-gray-500">Upload Product Image</span>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-40 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                                        {form.imageSrc ? (
                                            <img src={form.imageSrc} alt="Product" className="h-full object-contain" />
                                        ) : (
                                            <span className="text-gray-400 text-sm">No image</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Video Embed URL <span className="text-red-500">*</span></label>
                                {!isViewMode ? (
                                    <div className="flex flex-col h-40 justify-start">
                                        <input
                                            type="text"
                                            placeholder="https://www.youtube.com/embed/..."
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-sm mb-2"
                                            value={form.videoUrl}
                                            onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                                            required
                                        />
                                        {form.videoUrl && (
                                            <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
                                                <iframe src={form.videoUrl} className="w-full h-full absolute inset-0" title="Preview" frameBorder="0" allowFullScreen></iframe>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-40 bg-black rounded-xl overflow-hidden relative">
                                        <iframe src={form.videoUrl} className="w-full h-full absolute inset-0" title="Preview" frameBorder="0" allowFullScreen></iframe>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Video Title <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    disabled={isViewMode}
                                    type="text"
                                    className={`w-full px-3 py-2 border rounded-lg outline-none ${isViewMode ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-200 focus:border-emerald-500"}`}
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Farmer Name <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    disabled={isViewMode}
                                    type="text"
                                    className={`w-full px-3 py-2 border rounded-lg outline-none ${isViewMode ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-200 focus:border-emerald-500"}`}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Area / Location <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    disabled={isViewMode}
                                    type="text"
                                    className={`w-full px-3 py-2 border rounded-lg outline-none ${isViewMode ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-200 focus:border-emerald-500"}`}
                                    value={form.area}
                                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Platform</label>
                                <select
                                    disabled={isViewMode}
                                    className={`w-full px-3 py-2 border rounded-lg outline-none ${isViewMode ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-200 bg-white focus:border-emerald-500"}`}
                                    value={form.platform}
                                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                                >
                                    <option value="youtube">YouTube</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="twitter">Twitter</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Season</label>
                                <select
                                    disabled={isViewMode}
                                    className={`w-full px-3 py-2 border rounded-lg outline-none ${isViewMode ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-200 bg-white focus:border-emerald-500"}`}
                                    value={form.season}
                                    onChange={(e) => setForm({ ...form, season: e.target.value })}
                                >
                                    <option value="">Select Season</option>
                                    <option value="Kharif">Kharif</option>
                                    <option value="Rabi">Rabi</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Date</label>
                                <input
                                    type="date"
                                    disabled={isViewMode}
                                    className={`w-full px-3 py-2 border rounded-lg outline-none ${isViewMode ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-200 focus:border-emerald-500"}`}
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                    >
                        {isViewMode ? "Close" : "Cancel"}
                    </button>
                    {!isViewMode && (
                        <button
                            type="submit"
                            form="testimonial-form"
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2"
                        >
                            <Save size={18} /> {isEditing ? "Save Changes" : "Save Testimonial"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
