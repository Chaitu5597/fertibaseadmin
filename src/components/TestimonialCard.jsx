// src/components/TestimonialCard.jsx
import React from 'react';
import {
    PlayCircle, MapPin, Sun, Calendar, Pencil, Trash2, Eye,
    Youtube, Facebook, Instagram, Twitter
} from "lucide-react";

export const PlatformIcon = ({ platform }) => {
    switch (platform?.toLowerCase()) {
        case "youtube": return <Youtube className="text-red-600" size={16} />;
        case "facebook": return <Facebook className="text-blue-600" size={16} />;
        case "instagram": return <Instagram className="text-pink-600" size={16} />;
        case "twitter": return <Twitter className="text-sky-500" size={16} />;
        default: return <PlayCircle size={16} />;
    }
};

export const TestimonialCard = ({ testimonial, onEdit, onView, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group">
            {/* Action Buttons Overlay */}
            <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onView(testimonial)}
                    className="p-1.5 bg-white text-emerald-600 rounded-lg shadow-sm hover:bg-emerald-50 border border-gray-100 transition-colors"
                    title="View Details"
                >
                    <Eye size={16} />
                </button>
                <button
                    onClick={() => onEdit(testimonial)}
                    className="p-1.5 bg-white text-blue-600 rounded-lg shadow-sm hover:bg-blue-50 border border-gray-100 transition-colors"
                    title="Edit"
                >
                    <Pencil size={16} />
                </button>
                <button
                    onClick={() => onDelete(testimonial.id)}
                    className="p-1.5 bg-white text-red-600 rounded-lg shadow-sm hover:bg-red-50 border border-gray-100 transition-colors"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Video Preview */}
            <div className="aspect-video w-full bg-gray-100 relative">
                <iframe
                    src={testimonial.videoUrl}
                    title={testimonial.title}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{testimonial.title}</h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-xs">
                        <PlatformIcon platform={testimonial.platform} />
                        <span className="capitalize text-gray-600">{testimonial.platform}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <img
                        src={testimonial.imageSrc}
                        alt="Product"
                        className="w-10 h-10 rounded-lg object-contain border border-gray-200 bg-gray-50"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin size={12} />
                            {testimonial.area}
                        </p>
                    </div>
                </div>

                <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <Sun size={14} className="text-orange-500" />
                        <span>Season: {testimonial.season}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-500" />
                        <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
