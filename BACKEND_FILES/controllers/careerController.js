const Career = require('../models/Career');

// @desc    Get all careers
// @route   GET /api/Careers
// @access  Public
exports.getCareers = async (req, res) => {
    try {
        const careers = await Career.find().sort({ createdAt: -1 });
        res.status(200).json(careers);
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ message: 'Server error while fetching careers', error: error.message });
    }
};

// @desc    Get single career by ID
// @route   GET /api/Careers/:id
// @access  Public
exports.getCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(200).json(career);
    } catch (error) {
        console.error('Error fetching career:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(500).json({ message: 'Server error while fetching career', error: error.message });
    }
};

// @desc    Create new career
// @route   POST /api/Careers
// @access  Private (add authentication middleware as needed)
exports.createCareer = async (req, res) => {
    try {
        const {
            category,
            title,
            preview,
            desc,
            about,
            responsibilities,
            requirements,
            skills,
            tools,
            experience,
            salary,
            location,
            mode,
            type,
            positions,
            daysLeft,
            niceToHave,
            applyNote
        } = req.body;

        // Validate required fields
        if (!category || !title) {
            return res.status(400).json({ message: 'Category and title are required' });
        }

        const career = new Career({
            category,
            title,
            preview,
            desc,
            about,
            responsibilities,
            requirements,
            skills,
            tools,
            experience,
            salary,
            location,
            mode,
            type,
            positions,
            daysLeft,
            niceToHave,
            applyNote
        });

        const savedCareer = await career.save();
        res.status(201).json(savedCareer);
    } catch (error) {
        console.error('Error creating career:', error);
        res.status(500).json({ message: 'Server error while creating career', error: error.message });
    }
};

// @desc    Update career
// @route   PUT /api/Careers/:id
// @access  Private (add authentication middleware as needed)
exports.updateCareer = async (req, res) => {
    try {
        const {
            category,
            title,
            preview,
            desc,
            about,
            responsibilities,
            requirements,
            skills,
            tools,
            experience,
            salary,
            location,
            mode,
            type,
            positions,
            daysLeft,
            niceToHave,
            applyNote
        } = req.body;

        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        // Update fields
        career.category = category || career.category;
        career.title = title || career.title;
        career.preview = preview !== undefined ? preview : career.preview;
        career.desc = desc !== undefined ? desc : career.desc;
        career.about = about !== undefined ? about : career.about;
        career.responsibilities = responsibilities !== undefined ? responsibilities : career.responsibilities;
        career.requirements = requirements !== undefined ? requirements : career.requirements;
        career.skills = skills !== undefined ? skills : career.skills;
        career.tools = tools !== undefined ? tools : career.tools;
        career.experience = experience !== undefined ? experience : career.experience;
        career.salary = salary !== undefined ? salary : career.salary;
        career.location = location !== undefined ? location : career.location;
        career.mode = mode || career.mode;
        career.type = type || career.type;
        career.positions = positions !== undefined ? positions : career.positions;
        career.daysLeft = daysLeft !== undefined ? daysLeft : career.daysLeft;
        career.niceToHave = niceToHave !== undefined ? niceToHave : career.niceToHave;
        career.applyNote = applyNote !== undefined ? applyNote : career.applyNote;

        const updatedCareer = await career.save();
        res.status(200).json(updatedCareer);
    } catch (error) {
        console.error('Error updating career:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(500).json({ message: 'Server error while updating career', error: error.message });
    }
};

// @desc    Delete career
// @route   DELETE /api/Careers/:id
// @access  Private (add authentication middleware as needed)
exports.deleteCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }

        await Career.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Career deleted successfully', id: req.params.id });
    } catch (error) {
        console.error('Error deleting career:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Career not found' });
        }

        res.status(500).json({ message: 'Server error while deleting career', error: error.message });
    }
};
