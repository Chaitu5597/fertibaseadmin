const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: [true, 'Video URL is required'],
        trim: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    area: {
        type: String,
        default: '',
        trim: true
    },
    platform: {
        type: String,
        enum: ['youtube', 'facebook', 'instagram', 'twitter'],
        default: 'youtube',
        lowercase: true
    },
    season: {
        type: String,
        default: '',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
