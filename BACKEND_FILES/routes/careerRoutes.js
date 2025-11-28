const express = require('express');
const router = express.Router();
const {
    getCareers,
    getCareer,
    createCareer,
    updateCareer,
    deleteCareer
} = require('../controllers/careerController');

// @route   GET /api/Careers
// @desc    Get all careers
// @access  Public
router.get('/', getCareers);

// @route   GET /api/Careers/:id
// @desc    Get single career by ID
// @access  Public
router.get('/:id', getCareer);

// @route   POST /api/Careers
// @desc    Create new career
// @access  Private (add auth middleware as needed)
router.post('/', createCareer);

// @route   PUT /api/Careers/:id
// @desc    Update career
// @access  Private (add auth middleware as needed)
router.put('/:id', updateCareer);

// @route   DELETE /api/Careers/:id
// @desc    Delete career
// @access  Private (add auth middleware as needed)
router.delete('/:id', deleteCareer);

module.exports = router;
