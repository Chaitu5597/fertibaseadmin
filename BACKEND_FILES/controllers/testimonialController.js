const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Server error while fetching testimonials', error: error.message });
    }
};

exports.getTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json(testimonial);
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(500).json({ message: 'Server error while fetching testimonial', error: error.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const {
            videoUrl,
            imageSrc,
            title,
            name,
            area,
            platform,
            season,
            date
        } = req.body;

        if (!videoUrl || !title || !name) {
            return res.status(400).json({ message: 'Video URL, title, and name are required' });
        }

        const testimonial = new Testimonial({
            videoUrl,
            imageSrc,
            title,
            name,
            area,
            platform,
            season,
            date
        });

        const savedTestimonial = await testimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ message: 'Server error while creating testimonial', error: error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const {
            videoUrl,
            imageSrc,
            title,
            name,
            area,
            platform,
            season,
            date
        } = req.body;

        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        testimonial.videoUrl = videoUrl || testimonial.videoUrl;
        testimonial.imageSrc = imageSrc !== undefined ? imageSrc : testimonial.imageSrc;
        testimonial.title = title || testimonial.title;
        testimonial.name = name || testimonial.name;
        testimonial.area = area !== undefined ? area : testimonial.area;
        testimonial.platform = platform || testimonial.platform;
        testimonial.season = season !== undefined ? season : testimonial.season;
        testimonial.date = date !== undefined ? date : testimonial.date;

        const updatedTestimonial = await testimonial.save();
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(500).json({ message: 'Server error while updating testimonial', error: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        await Testimonial.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Testimonial deleted successfully', id: req.params.id });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(500).json({ message: 'Server error while deleting testimonial', error: error.message });
    }
};
