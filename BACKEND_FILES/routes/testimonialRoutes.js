const express = require('express');
const router = express.Router();
const {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', getTestimonials);

// @route   GET /api/testimonials/:id
// @desc    Get single testimonial by ID
// @access  Public
router.get('/:id', getTestimonial);

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Private (add auth middleware as needed)
router.post('/', createTestimonial);

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private (add auth middleware as needed)
router.put('/:id', updateTestimonial);

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private (add auth middleware as needed)
router.delete('/:id', deleteTestimonial);

module.exports = router;
